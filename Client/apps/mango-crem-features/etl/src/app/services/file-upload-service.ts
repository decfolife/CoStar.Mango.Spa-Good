import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { from, interval, Subject, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  toArray,
} from 'rxjs/operators';
import {
  ETLDocImportLongProcess,
  ETLDocumentImportStatus,
} from '@etl/model/document-import-enums';
import { ETLService } from './etl.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  @Output() public onUploadFinished = new EventEmitter();
  longProcessCompleted = false;
  isDocumentImportFailed = false;
  uploadStatus = '';
  uploadProgress = 0;
  stopSignal = new Subject<void>();

  constructor(private etlService: ETLService) {}

  getAllowedExtenstions(): string {
    return '.ai, .avi, .bmp, .cdb, .csv, .ctb, .db, .dgn, .doc, .docm, .docx, .dot, .dotx, .dwf, .dwg, .dxf, .eml, .fmp, .g2m, .gif, .ics, .ipx, .jpeg, .jpg, .kmz, .mdb, .mdi, .mht, .mov, .mp4, .mpg, .mpp, .msg, .nsf, .ods, .oft, .pcp, .pdf, .plt, .png, .pps, .ppt, .pptm, .pptx, .psd, .ptm, .pub, .rar, .rtf, .rvt, .shx, .sif, .snag, .snp, .tif, .tiff, .ttf, .txt, .vcf, .vsd, .wav, .wk4, .wmv, .xlk, .xls, .xlsb, .xlsm, .xlsx, .xlt, .xltx, .xml, .xps, .zip, .cad';
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }

  async uploadLoadChunkFileSequentially(file: File): Promise<boolean> {
    return this.uploadChunkFiles(file);
  }

  uploadChunkFiles = async (file: File): Promise<boolean> => {
    const filename = file.name;
    const chunkSizeBytes = 10 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSizeBytes);

    this.uploadStatus = '';
    this.uploadProgress = 0;

    const chunks: Array<{
      formData: FormData;
      chunkIndex: number;
      chunkSize: number;
    }> = [];

    for (
      let start = 0, chunkIndex = 0;
      start < file.size;
      start += chunkSizeBytes, chunkIndex++
    ) {
      const chunk = file.slice(
        start,
        Math.min(start + chunkSizeBytes, file.size)
      );

      const formData = new FormData();
      formData.append('chunkFile', chunk, filename);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('fileName', filename);
      formData.append('fileSize', file.size.toString());

      chunks.push({ formData, chunkIndex, chunkSize: chunk.size });
    }

    const loadedByChunk = new Map<number, number>();

    const updateOverallProgress = () => {
      let loadedTotal = 0;
      for (const v of loadedByChunk.values()) loadedTotal += v;
      this.uploadProgress = file.size
        ? Math.round((100 * loadedTotal) / file.size)
        : 100;
    };

    try {
      await from(chunks)
        .pipe(
          concatMap(({ formData, chunkIndex, chunkSize }) =>
            from(this.etlService.chunkFileUpload(formData)).pipe(
              mergeMap((http$) => http$),
              tap((event: any) => {
                if (!event) return;

                if (event.type === HttpEventType.UploadProgress) {
                  const chunkLoaded = Math.min(event.loaded ?? 0, chunkSize);
                  loadedByChunk.set(chunkIndex, chunkLoaded);
                  updateOverallProgress();
                }

                if (event.type === HttpEventType.Response) {
                  loadedByChunk.set(chunkIndex, chunkSize);
                  updateOverallProgress();
                  this.onUploadFinished.emit(event.body);
                }
              }),
              filter((event: any) => event?.type === HttpEventType.Response),
              map(() => true),
              catchError((err: HttpErrorResponse) => {
                this.uploadStatus = `Error uploading file. Status: ${err.status} ${err.statusText} Message: ${err.message}`;
                return throwError(err);
              })
            )
          ),
          toArray()
        )
        .toPromise();

      this.uploadProgress = 100;
      return true;
    } catch {
      return false;
    }
  };

  handleLongProcessPooling(processName: ETLDocImportLongProcess) {
    let milliseconds: number = 0.01 * 60 * 1000;
    return new Promise<ETLDocumentImportStatus>((resolve, reject) => {
      interval(milliseconds)
        .pipe(
          switchMap(() => this.etlService.getDocumentImportStatus()),
          takeWhile((response: { success: boolean; data: any }) => {
            milliseconds = 0.5 * 60 * 1000;
            switch (processName) {
              case ETLDocImportLongProcess.UPLOADEXTRACTFILES:
                return (
                  response.data.StatusId !==
                    ETLDocumentImportStatus.FILESEXTRACTED &&
                  response.data.StatusId !==
                    ETLDocumentImportStatus.FILESVALIDATED
                );
              case ETLDocImportLongProcess.VALIDATEFILES:
                return (
                  response.data.StatusId !==
                  ETLDocumentImportStatus.FILESVALIDATED
                );
              case ETLDocImportLongProcess.VALIDTEMPLATE:
                return (
                  response.data.StatusId !==
                  ETLDocumentImportStatus.TEMPLATEVALIDATED
                );
              case ETLDocImportLongProcess.MAPTOOBJECTS:
                return (
                  response.data.StatusId !==
                  ETLDocumentImportStatus.PROCESSCOMPLETED
                );
            }
          }, true),
          takeUntil(this.stopSignal)
        )
        .subscribe({
          next: (response) => {
            let processCompleted = false;
            switch (processName) {
              case ETLDocImportLongProcess.UPLOADEXTRACTFILES:
                processCompleted =
                  response.data.StatusId ===
                    ETLDocumentImportStatus.FILESEXTRACTED ||
                  response.data.StatusId ===
                    ETLDocumentImportStatus.FILESVALIDATED;
                break;
              case ETLDocImportLongProcess.VALIDATEFILES:
                processCompleted =
                  response.data.StatusId ===
                  ETLDocumentImportStatus.FILESVALIDATED;
                break;
              case ETLDocImportLongProcess.VALIDTEMPLATE:
                processCompleted =
                  response.data.StatusId ===
                  ETLDocumentImportStatus.TEMPLATEVALIDATED;
                break;
              case ETLDocImportLongProcess.MAPTOOBJECTS:
                processCompleted =
                  response.data.StatusId ===
                  ETLDocumentImportStatus.PROCESSCOMPLETED;
                break;
            }
            if (processCompleted) {
              this.longProcessCompleted = true;
              this.stopSignal.next();
              this.stopSignal.complete();
              return resolve(response.data.StatusId);
            }
          },
          complete: () => {
            //console.log('interval Observable completed')
          },
          error: (err) => reject(`Error occurred. - ${err}`),
        });
    });
  }

  isFileSizeFourGB(documentsize: number): boolean {
    const fileSize: number = documentsize;
    const gigabyte: number = 1024 * 1024 * 1024;
    return fileSize <= 4 * gigabyte;
  }
}
