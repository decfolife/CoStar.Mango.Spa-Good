import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  LoaderModule,
  ButtonModule,
  DropdownModule,
  IconModule,
  CremToastService,
} from '@mango/ui-shared/lib-ui-elements';
import { DxDataGridComponent } from 'devextreme-angular';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { BenchmarkingService } from '@benchmarking-files/services/benchmarking.service';
import { LogFileDownloadRequest } from '@benchmarking-files/model/log-file-download-request';
import { DownloadBenchmarkingFileRequest } from '@benchmarking-files/model/download-benchmarking-file-request';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { ToastState } from 'libs/data-models/lib-data-models/src/lib/enums/ui-shared-elements.enums';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';

@Component({
  selector: 'mango-benchmarking-files',
  standalone: true,
  imports: [
    CommonModule,
    LoaderModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    DevExpressModule,
    SearchModule,
    ButtonModule,
    DropdownModule,
    IconModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './benchmarking-files.component.html',
  styleUrls: ['./benchmarking-files.component.scss'],
})
export class BenchmarkingFilesComponent implements OnInit, OnDestroy {
  @ViewChild('FilesDataGrid') FilesDataGrid!: DxDataGridComponent;

  private subs: Subscription = new Subscription();
  objectId!: number;
  objectTypeId!: number;
  objectTypeTypeId!: number;
  benchmarkingFiles: any;
  objectTypeAndName: string = '';
  searchText: string = '';
  isLoading = true;
  isExpanded: boolean = true;

  constructor(
    @Inject(BenchmarkingService)
    public benchmarkingService: BenchmarkingService,
    private route: ActivatedRoute,
    private facade: MangoAppFacade,
    private toastService: CremToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const params = this.toLowerParams(queryParams);
      this.objectId = Number(params['oid']);
      this.objectTypeId = Number(params['otid']);
      this.objectTypeTypeId = Number(params['ottid']);
    });

    this.subs.add(this.getUserPreferences());
    this.getObjectTypeAndName();
    this.populateGrid();
  }

  populateGrid() {
    this.subs.add(
      this.benchmarkingService
        .lookupLease(this.objectId)
        .subscribe((result: any) => {
          if (result.success) {
            this.benchmarkingFiles = result.data;
            this.isLoading = false;
          } else {
            this.handleError(result.errorMessage);
          }
        })
    );
  }

  searchDataGrid(data: string) {
    this.searchText = data;
    this.FilesDataGrid.instance.searchByText(data);
  }

  getUserPreferences() {
    this.facade.contactRecord$.subscribe((contact) => {
      this.benchmarkingService.dateFormat = contact.preferences?.contactDatesEU
        ? 'dd.MM.yyyy'
        : 'MM/dd/yyyy';
    });
  }

  getObjectTypeAndName() {
    this.subs.add(
      this.benchmarkingService
        .getObjectTypeAndName(this.objectId, this.objectTypeId)
        .subscribe((result: any) => {
          if (result.success) {
            this.objectTypeAndName = result.data;
          } else {
            this.handleError(result.errorMessage);
          }
        })
    );
  }

  onFileDownloadClick(rowData: any): void {
    if (!rowData?.documentId) {
      console.error('Document ID is missing.');
      return;
    }

    this.logFileDownload(rowData);
    this.downloadBenchmarkingFile(rowData);
  }

  // Download the benchmarking file from the api
  private downloadBenchmarkingFile(rowData: any) {
    const downloadBenchmarkingFileRequest: DownloadBenchmarkingFileRequest = {
      oid: this.objectId,
      otid: this.objectTypeId,
      documentId: rowData.documentId,
    };

    this.subs.add(
      this.benchmarkingService
        .downloadBenchmarkingFile(downloadBenchmarkingFileRequest)
        .subscribe(
          (response: HttpResponse<Blob>) => {
            if (response.body) {
              const fileName =
                this.getFileNameFromHeaders(response.headers) ||
                'downloaded-file';
              this.downloadFile(response.body, fileName);
              this.successNotify('File Downloaded Successfully');
            } else {
              this.handleError('Failed to download document');
            }
          },
          (error) => {
            this.handleBlobError(error);
          }
        )
    );
  }

  // handle any errors returning from the file downloading
  private handleBlobError(error: HttpErrorResponse) {
    if (error.error instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const errorJson = JSON.parse(reader.result as string);
          this.handleError(
            errorJson.clientErrorMessage ||
              errorJson ||
              'An unexpected error occurred.'
          );
        } catch (e) {
          this.handleError(
            'An error occurred, but could not parse error details.'
          );
        }
      };
      reader.readAsText(error.error);
    } else {
      this.handleError(error.message || 'An unexpected error occurred.');
    }
  }

  // Get the file name from the response
  private getFileNameFromHeaders(headers: HttpHeaders): string | null {
    const contentDisposition = headers.get('Content-Disposition');
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      return match ? match[1] : null;
    }
    return null;
  }

  // Send file to the browser
  private downloadFile(blob: Blob, fileName: string) {
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Log history that the file was opened
  private logFileDownload(rowData: any) {
    const logFileDownloadRequest: LogFileDownloadRequest = {
      userFileName: rowData.userFileName,
      systemFileName: rowData.systemFileName,
      documentTotalBytes: rowData.documentTotalBytes,
      oid: this.objectId,
      otid: this.objectTypeId,
      description: rowData.description,
      documentId: String(rowData.documentId),
      clientKey: rowData.clientKey,
    };

    this.subs.add(
      this.benchmarkingService
        .logFileDownload(logFileDownloadRequest)
        .subscribe((result: any) => {
          if (!result.success) {
            this.handleError(result.errorMessage);
          }
        })
    );
  }

  handleError(message: any) {
    this.errorNotify(message);
    return of(null);
  }

  private toLowerParams(params: Params): Params {
    return Object.keys(params).reduce((acc, key) => {
      acc[key.toLowerCase()] = params[key];
      return acc;
    }, {} as Params);
  }

  errorNotify(message: string) {
    this.toastService.show(message, '', ToastState.ERROR, {
      position: 'bottom right',
      maxWidth: '350px',
    });
  }

  successNotify(message: string) {
    this.toastService.show(message, 'Success', ToastState.SUCCESS);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
