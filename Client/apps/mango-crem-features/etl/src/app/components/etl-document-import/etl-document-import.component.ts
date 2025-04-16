import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ETLService } from '@etl/services/etl.service';
import { Subscription } from 'rxjs';
import {
  PageHeaderComponent,
  ButtonModule,
  CardModule,
  CheckBoxComponent,
  InputComponent,
  NoObjectsFoundComponent,
  ToastComponent,
  CremToastService,
} from '@mango/ui-shared/lib-ui-elements';
import { ToastState } from '../../../../../../../libs/data-models/lib-data-models/src';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'mango-etl-document-import',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    ButtonModule,
    CardModule,
    CheckBoxComponent,
    InputComponent,
    NoObjectsFoundComponent,
    MatStepperModule,
    ToastComponent,
  ],
  templateUrl: './etl-document-import.component.html',
  styleUrls: ['./etl-document-import.component.scss'],
})
export class EtlDocumentImportComponent {
  @ViewChild('DocumentImportStepper', { static: false }) stepper: MatStepper;
  clientKey = '';
  currentStepIndex = 0;
  isSuperUser = false;
  subs: Subscription[] = [];
  hasDocumentImportRights = false;
  canAccessDocumentImportPage = true;
  fileSelected = false;
  fileLoadingCompleted = false;
  fileLoading = false;
  // fileValidating = false;
  fileValidationCompleted = false;
  importingMappingTemplateComplete = false;
  isFTP = false;
  ftpPath = 'ftp.test.corp.virtualpremise.com';
  ftpWarning =
    'This is the directory where the .zip file should be loaded via the CoStar SFTP site.';
  validationResult = null;

  fileToUpload: File | null = null;
  totalFilesUploaded: number;
  totalSizeUploaded: number;
  untrustedFileName: string;
  uploadStatusHtml: string = '';
  uploadProgress: number = 0;
  uploadStatus: string = '';
  selectedFileNameDisplay: string = '';
  allowedExtensions: string = '';
  //documentsImportStatus: boolean = false;

  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('hdnFileInput') selectFileInput: ElementRef;
  constructor(
    private etlService: ETLService,
    private mangoFacade: MangoAppFacade,
    private toastService: CremToastService
  ) {}

  ngOnInit(): void {
    this.selectedFileNameDisplay = '';
    this.allowedExtensions = this.getAllowedExtenstions();
    this.subs.push(
      this.etlService.hasDocumentImportRight().subscribe((result) => {
        if (result.success) {
          this.canAccessDocumentImportPage = result.data;
          this.setFTPPath();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  getAllowedExtenstions(): string {
    const extns =
      '.ai,.avi,.bmp,.cdb,.csv,.ctb,.db,.dgn,.doc,.docm,.docx,.dot,.dotx,.dwf,.dwg,.dxf,.eml,.fmp,.g2m,.gif,.ics,.ipx,.jpeg,.jpg,.kmz,.mdb,.mdi,.mht,.mov,.mp4,.mpg,.mpp,.msg,.nsf,.ods,.oft,.pcp,.pdf,.plt,.png,.pps,.ppt,.pptm,.pptx,.psd,.ptm,.pub,.rar,.rtf,.rvt,.shx,.sif,.snag,.snp,.tif,.tiff,.ttf,.txt,.vcf,.vsd,.wav,.wk4,.wmv,.xlk,.xls,.xlsb,.xlsm,.xlsx,.xlt,.xltx,.xml,.xps,.zip,.CAD';
    return extns;
  }

  selectFile(event: any): void {
    this.isFTP = false;

    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      const extension = this.getFileExtension(this.fileToUpload.name);
      const allowedExtensions = '.' + this.getAllowedExtenstions();
      if (!allowedExtensions.includes(extension)) {
        const invalidFiletypeOrEmpty = `Input file not supported or empty, select only supported file types.`;
        this.toastService.show(invalidFiletypeOrEmpty, '', ToastState.ERROR, {
          maxWidth: '500px',
          duration: 5000,
          closeOnClick: true,
        });
      } else {
        this.fileSelected = true;
        this.selectedFileNameDisplay = this.fileToUpload.name;
      }
    }
    //TODO: Replace the following place holder during API integration
    /* setTimeout(() => {
      this.fileSelected = true;
    }, 2000); */
  }

  ftpCheckValueChanged() {
    this.isFTP = !this.isFTP;
    this.fileSelected = this.isFTP;
  }

  moveToValidateFilesStep(stepper): void {
    if (this.fileSelected || !this.fileLoadingCompleted) {
      this.fileLoading = true;

      if (this.isFTP) {
        this.subs.push(
          this.etlService.getFilesFromSftp().subscribe((result) => {
            if (result.success) {
              this.fileLoadingCompleted = true;
              stepper.selected.completed = true;
              stepper.selectedIndex = 1;
              this.currentStepIndex = 1;
              this.validateFiles();
            }
          })
        );
      } else {
        //TODO: Upload selected file
        //var nextMoveFlg = (async ()=>{ await this.uploadLoadChunkFileSequentially();});
        var nextMoveFlg = this.uploadLoadChunkFileSequentially();
        nextMoveFlg.then((x) => {
          if (x) {
            // TODO: GET THE IMPORT STATUS FROM [dbo].[tblETLDocumentStatus] WHERE StatusID=2 and Status=1 and set this.documentsImportStatus = true;
            // AFTER UPLOADING AND UNZIP COMPLETED MOVE TO NEXT STEP.

            //if(this.documentsImportStatus){
            this.fileLoadingCompleted = true;
            stepper.selected.completed = true;
            stepper.selectedIndex = 1;
            this.currentStepIndex = 1;
            this.validateFiles();
            //} else { this.uploadStatus = "Documents importing is still in progress, Email will be send after importing all documents. Please try later." }
          }
        });
      }
      return;
    }
  }

  moveToMappingTemplateStep(stepper): void {
    //TODO: Replace the following place holder during API integration
    setTimeout(() => {
      this.fileLoadingCompleted = true;
      // this.fileValidating = false;
      stepper.selected.completed = true;
      stepper.selectedIndex = 2;
      this.currentStepIndex = 2;
    }, 8000);
  }

  downloadValidationResult() {
    this.etlService.downloadExcel();
  }

  cancelProcess() {
    this.fileLoadingCompleted = true;
  }

  importMappingTemplate(): void {
    setTimeout(() => {
      this.importingMappingTemplateComplete = true;
    }, 2000);
  }

  moveToExecuteStep(stepper): void {
    this.currentStepIndex = 3;
    stepper.selected.completed = true;
    stepper.selectedIndex = 3;
  }

  // selected file - document Upload start

  getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }
  triggerSelectInputFile(): void {
    this.selectFileInput.nativeElement.click();
  }
  async processChunkFileUploadSequentially(currentPromise) {
    return await currentPromise();
  }

  async uploadLoadChunkFileSequentially(): Promise<boolean> {
    const currentPromiseItems = await this.uploadChunkFiles();
    let canMoveToNextSetp: boolean = true;

    const processCompleted: number[] = [];
    //this.uploadStatus += 'Merge will start after uploading selected file';
    for (let i = 0; i < currentPromiseItems.length; i++) {
      if (!canMoveToNextSetp) break;

      await this.processChunkFileUploadSequentially(currentPromiseItems[i])
        .then((results) => {
          // console.log('AfterPromiseR:' + results);
          processCompleted.push(i);
        })
        .catch((err) => {
          //console.log('uploadLoadChunkFileSequentially' +  err);
          canMoveToNextSetp = false;
          //return false;
        });
    }

    if (
      canMoveToNextSetp &&
      processCompleted.length == currentPromiseItems.length
    ) {
      this.uploadStatus += 'Merge started, It will take few mins to complete.';
      return true;
    } else {
      return false;
    }
  }

  uploadChunkFiles = async () => {
    const file = this.fileToUpload;
    const filename = this.fileToUpload.name;
    const chunkSize: number = 10 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let start = 0;
    let chunkIndex = 0;
    this.uploadStatusHtml = '';
    const arrPromiseFns = [];

    try {
      while (start < file.size) {
        const chunk = file.slice(start, start + chunkSize);
        const formData = new FormData();
        formData.append('chunkFile', chunk, filename);
        formData.append('chunkIndex', chunkIndex.toString());
        formData.append('totalChunks', totalChunks.toString());
        formData.append('fileName', filename);
        this.onUploadFinished = new EventEmitter();
        this.uploadProgress = 0;
        //this.uploadStatus  = '';
        const successmsg = `Successfully completed chunk ${chunkIndex.toString()} in array`;
        const isLastChunk: boolean = chunkIndex == totalChunks - 1;
        arrPromiseFns.push(
          () =>
            new Promise<any>((resolve2) =>
              setTimeout(async () => {
                (
                  await this.etlService.chunkFileUpload(formData, isLastChunk)
                ).subscribe({
                  next: (event) => {
                    if (event) {
                      if (event.type === HttpEventType.UploadProgress)
                        this.uploadProgress = Math.round(
                          (100 * event.loaded) / event.total
                        );
                      else if (event.type === HttpEventType.Response) {
                        //console.log(event.body);
                        this.uploadStatus = '' + event.body.data;
                        this.onUploadFinished.emit(event.body);
                        resolve2(successmsg);
                      }
                    }
                  },
                  error: (err: HttpErrorResponse) => {
                    this.uploadStatus = `Error uploading file. Status: ${err.status} ${err.statusText} 
                          Message: ${err.message}`;
                  },
                  complete: () => {},
                }); // subscribe
              }, 1000)
            )
        );

        (start += chunkSize), chunkIndex++;
      } // whileloop
      return arrPromiseFns;
    } catch (error) {
      console.log(error);
    }
  }; // uploadChunkFiles

  // selected file - document Upload end

  private setFTPPath() {
    this.subs.push(
      this.mangoFacade.clientKey$.subscribe((clientKey) => {
        this.clientKey = clientKey;
        this.ftpPath = `/Clients/ftp_${this.clientKey}_test/Inbound/toCostar/DocumentImport/`;
      })
    );
  }

  private validateFiles() {
    if (!this.fileValidationCompleted) {
      this.subs.push(
        this.etlService.validateFiles().subscribe((result) => {
          if (result.success) {
            this.fileValidationCompleted = true;
            this.getValidationResults();
          }
        })
      );
    } else {
      this.getValidationResults();
    }
  }

  private getValidationResults(): void {
    this.subs.push(
      this.etlService.getValidateResults().subscribe((result) => {
        if (result.success) {
          this.validationResult = result.data[0];
          this.fileValidationCompleted = true;
        }
      })
    );
  }
}
