import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonModule, CardModule } from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { TaskInfoUIService } from '@project-dashboard/services/task-info-ui.service';
import { DxListModule } from 'devextreme-angular';
import { ItemDeletingEvent } from 'devextreme/ui/list';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'crem-upload-file-list',
  standalone: true,
  imports: [CommonModule, DxListModule, ButtonModule, CardModule],
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
})
export class FilesListComponent implements OnInit, OnDestroy {
  @Output() onUploadClick: EventEmitter<any> = new EventEmitter<any>();

  selectedFiles$: Observable<File[]>;
  selectedFilesDatasource$: Observable<any[]>;
  uploadFilesReady$: Observable<boolean>;
  uploadFilesInProgres$: Observable<boolean>;
  filesStats$: Observable<{ nbFiles: number; size: number }>;

  subs: Subscription[] = [];

  constructor(
    private taskInfoUIService: TaskInfoUIService,
    private facade: MangoAppFacade
  ) {}

  ngOnInit(): void {
    this.selectedFiles$ = this.taskInfoUIService.selectedFiles$;
    this.uploadFilesInProgres$ = this.taskInfoUIService.uploadFilesInProgress$;

    this.selectedFilesDatasource$ = this.selectedFiles$.pipe(
      filter((files) => !!files),
      map(this.mapFilesToDXDataSource)
    );

    this.filesStats$ = this.taskInfoUIService.selectedFiles$.pipe(
      filter((files) => !!files),
      map(this.generateFilesStats)
    );
  }

  mapFilesToDXDataSource(files: File[]) {
    return files.map((f) => ({
      id: f.name,
      name: f.name,
      size: f.size,
    }));
  }

  generateFilesStats(files: File[]): { nbFiles: number; size: number } {
    return {
      nbFiles: files.length,
      size: files.reduce((sum, f) => sum + f.size, 0) / 1024,
    };
  }

  onFileDeleting(event: ItemDeletingEvent): void {
    this.subs.push(
      this.selectedFiles$
        .pipe(
          take(1),
          map((selectedFiles) =>
            selectedFiles.filter((f) => f.name != event.itemData.name)
          ),
          tap({
            next: (updatedFiles) => {
              this.taskInfoUIService.selectedFiles$.next(updatedFiles);
              this.facade.refreshLeftSideNav();
            },
          })
        )
        .subscribe()
    );
  }

  uploadFiles() {
    this.onUploadClick.emit();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
