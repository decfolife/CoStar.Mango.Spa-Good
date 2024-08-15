import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownComponent } from '@mango/ui-shared/lib-ui-elements';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { Observable, Subscription, of } from 'rxjs';
import { DxValidatorComponent } from 'devextreme-angular';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'mango-add-task-note',
  templateUrl: './add-task-note.component.html',
  styleUrls: ['./add-task-note.component.scss']
})
export class AddTaskNoteComponent {
  @ViewChild("NoteTypeDropdown") cremDropdown: DropdownComponent
  @ViewChild('NoteBodyValidator', { static: false }) noteBodyValidator: DxValidatorComponent;

  modalTitle = "Add Task Note";
  modalId: string = "addTaskNoteModal";
  subs: Subscription[] = [];
  noteTypesList: any[] = [];
  selectedNoteTypeId: number;
  commonNoteText: string;
  characterCountText: string;
  maxCommonNoteTextLength = 7000;
  newNoteSaved = false;
  noteTypeDropdownInValid = false;
  noteBodyTextAreaInValid = false
  dragPosition: any;
  addTaskNoteResult: any;
  private taskId: number;

  constructor(private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddTaskNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.taskId = data.taskId;
      this.dragPosition = data.dragPosition
 }

  ngOnInit() {
    this.updateAddTaskNoteResult();
    this.getCommonNoteTypes();
    this.setCharacterCountText();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  closeModal() {
    this.dialogRef.close(this.addTaskNoteResult);
  }

  onInputEvent(e) {
    this.commonNoteText = e.event.currentTarget.value;
    this.setCharacterCountText();
  }

  setCharacterCountText() {
    let textLength = this.commonNoteText === undefined ? 0 : this.commonNoteText.length 
    this.characterCountText = `${this.maxCommonNoteTextLength - textLength} characters remaining`
  }

  saveNote() {
    this.noteTypeDropdownInValid = !this.cremDropdown.validate().isValid;

    let noteBodyValidationResult = this.noteBodyValidator.instance.validate();
    this.noteBodyTextAreaInValid = !noteBodyValidationResult.isValid;

    if(this.noteTypeDropdownInValid || this.noteBodyTextAreaInValid) {
      this.dialogService.alert('Validation Error(s)', "You have left at least one required field empty.\r\n\r\nPlease update and try again.", 'OK');
      return;
    }

    const taskObjectTypeId = 9;

    this.subs.push(this.dashboardService.saveNote(this.taskId, taskObjectTypeId, 0, this.selectedNoteTypeId, this.commonNoteText).pipe(
      switchMap(saveRes => {
        let alertClosedOnSuccess: Observable<boolean> = of(false);

        if(!!saveRes && saveRes.success && saveRes.data > 0) {
          this.newNoteSaved = true;
          this.updateAddTaskNoteResult();
          alertClosedOnSuccess = this.dialogService.alert('Save Note', 'The note was saved successfully.', 'OK');
        }
        else {
          this.dialogService.alert('Save Note Error', 'There was an issue with saving the note. Please contact the system administrator.', 'OK');
        }
        return alertClosedOnSuccess;
      })
    ).subscribe(res => {
      if(!!res && res) {
        this.closeModal();
      }
    }));
  }

  onSelectedNoteTypeChanged(e) {
    this.selectedNoteTypeId = e[0].commonNoteTypeID;
  }

  getDragPosition(e) {
    this.dragPosition = e.source.getFreeDragPosition();
    this.updateAddTaskNoteResult();
  }

  private updateAddTaskNoteResult() {
    this.addTaskNoteResult = { saveSuccessful: this.newNoteSaved, newDragPosition: this.dragPosition };
  }   


  private getCommonNoteTypes() {
    this.subs.push(this.dashboardService.getCommonNoteTypes().subscribe(res => {
      if(!!res && res.success) {
        this.noteTypesList = res.data;
        if(this.noteTypesList.length > 0) {
          this.selectedNoteTypeId = this.noteTypesList[0].commonNoteTypeID;
        }
      }
      else {
        this.dialogService.alert('Get Common Note Types Error', 'There was an issue with getting the common note types. Please contact the system administrator.', 'OK');
      }
    }));
  }
}
