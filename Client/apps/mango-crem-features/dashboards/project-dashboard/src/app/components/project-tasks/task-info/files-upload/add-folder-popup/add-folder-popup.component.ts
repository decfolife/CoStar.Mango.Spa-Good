import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateFolderHTTPRequest,
  FOLDER_CREATE_DUPLICATE_ERR_MSG,
  FOLDER_CREATE_ERR_MSG,
  FOLDER_CREATE_SUCCESS_MSG,
  ToastState,
} from '@mango/data-models/lib-data-models';
import {
  CremFormsModule,
  CremPopupComponent,
  CremToastService,
  InputComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { TaskInfoUIService } from '@project-dashboard/services/task-info-ui.service';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  delay,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'crem-add-folder-popup',
  standalone: true,
  imports: [
    CommonModule,
    CremPopupComponent,
    CremFormsModule,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-folder-popup.component.html',
  styleUrls: ['./add-folder-popup.component.scss'],
})
export class AddFolderPopupComponent implements OnInit, OnDestroy {
  @Output() onFolderCreated: EventEmitter<any> = new EventEmitter<any>(null);

  addFolderPopupVisible$: Observable<boolean>;
  createFolderForm: FormGroup;

  subs: Subscription[] = [];

  constructor(
    private taskInfoUIService: TaskInfoUIService,
    private dashboardService: DashboardService,
    private toastService: CremToastService
  ) {
    this.generateCreateFolderHTTPCall =
      this.generateCreateFolderHTTPCall.bind(this);
    this.onFolderCreate = this.onFolderCreate.bind(this);
  }

  ngOnInit(): void {
    this.addFolderPopupVisible$ = this.taskInfoUIService.addFolderPopupVisible$;
    this.createFolderForm = new FormGroup({
      folderName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: new FormControl(''),
    });
  }

  get folderName() {
    return this.createFolderForm.get('folderName');
  }

  get description() {
    return this.createFolderForm.get('description');
  }

  createFolder(): void {
    this.taskInfoUIService.createFolderInProgress$.next(true);
    this.taskInfoUIService.addFolderPopupVisible$.next(false);
    this.subs.push(
      combineLatest([
        this.taskInfoUIService.selectedFolder$.pipe(take(1)),
        this.taskInfoUIService.projectId$.pipe(take(1)),
      ])
        .pipe(
          filter(
            ([selectedFolder, projectId]) => !!selectedFolder && !!projectId
          ),
          take(1),
          map(this.generateCreateFolderHTTPCall),
          switchMap((request: CreateFolderHTTPRequest) =>
            this.dashboardService.createTaskFolder(request)
          ),
          tap(this.onFolderCreate),
          delay(1000),
          tap(() => {
            this.createFolderForm.reset();
            this.createFolderForm.markAsPristine();
          })
        )
        .subscribe()
    );
  }

  generateCreateFolderHTTPCall([
    selectedFolder,
    projectId,
  ]): CreateFolderHTTPRequest {
    return {
      objectId: projectId,
      description: this.description.value || '',
      folderName: this.folderName.value,
      parentFolderId: selectedFolder.folderId,
    };
  }

  onFolderCreate(response): void {
    if (!response) {
      this.onFolderCreateError();
    } else if (response.data === 0) {
      this.toastService.show(
        FOLDER_CREATE_DUPLICATE_ERR_MSG,
        'Error',
        ToastState.ERROR
      );
      this.taskInfoUIService.createFolderInProgress$.next(false);
    } else {
      this.toastService.show(
        FOLDER_CREATE_SUCCESS_MSG,
        'Success',
        ToastState.SUCCESS
      );
      this.onFolderCreated.emit(null);
    }
  }

  onFolderCreateError(): void {
    this.taskInfoUIService.createFolderInProgress$.next(false);
    this.toastService.show(FOLDER_CREATE_ERR_MSG, 'Error', ToastState.ERROR);
  }

  closeAddFolderPopup() {
    this.taskInfoUIService.addFolderPopupVisible$.next(false);
    this.createFolderForm.reset();
    this.createFolderForm.markAsPristine();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
