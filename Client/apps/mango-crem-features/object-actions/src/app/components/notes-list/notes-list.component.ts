import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CommonNote,
  ObjectNotes,
  SecurityType,
} from '@mango/data-models/lib-data-models';
import { NotesService } from '@reminders-list/shared/services/notes.service';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxFilterBuilderModule,
} from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, tap, filter } from 'rxjs/operators';
import {
  PageHeaderComponent,
  SearchComponent,
  ButtonModule,
  CremPopupComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { AddNoteComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/add-note/add-note.component';
import {
  Condition,
  NotesGridColumnsService,
} from '../../shared/services/notes-grid-column-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mango-notes-list',
  standalone: true,
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxFilterBuilderModule,
    PageHeaderComponent,
    SearchComponent,
    ButtonModule,
    CremPopupComponent,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [DatePipe, NotesService, NotesGridColumnsService],
})
export class NotesListComponent implements OnInit, OnDestroy {
  @ViewChild('NotesGrid') notesGrid: DxDataGridComponent;
  objectTypeId: number;
  objectId: number;
  navPageId: any = '';
  userHasPageAccess: boolean = false;
  userHasViewRight: boolean = true;
  userHasAddRight: boolean = false;
  userHasEditRight: boolean = false;
  notes: CommonNote[] = [];
  objectName: string;
  objectType: string;
  // objectNotes: ObjectNotes;
  searchText: string;
  filter: Condition;
  gridFilterValue: Condition;
  showFilterBuilderPopUp: boolean;
  isVisibleDeleteCommonNotePopUp: boolean;
  commonNoteId: number;
  noteColumns: any[] = [];
  filterFields: any[] = [];
  infoChanged = false;
  dragPosition: any = { x: 0, y: 0 };

  subs: Subscription[] = [];
  private subscriptions = new Subscription();

  constructor(
    private notesService: NotesService,
    private notesGridColumnsService: NotesGridColumnsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.objectTypeId = Number(this.route.snapshot.queryParamMap.get('otid'));
    this.objectId = Number(this.route.snapshot.queryParamMap.get('oid'));
  }

  ngOnInit(): void {
    this.navPageId = this.route.snapshot.queryParamMap
      .get('navpageid')
      ?.split('?')[0];

    this.subs.push(
      this.notesService
        .hasNotesPageRight(this.navPageId)
        .pipe(
          switchMap((hasNotesPageRight) => {
            if (!hasNotesPageRight || !hasNotesPageRight.success) {
              this.userHasPageAccess = false;
              return of(false);
            } else {
              this.userHasPageAccess = hasNotesPageRight.data;
            }

            return this.notesService.getMaxObjectRight(
              this.objectId,
              this.objectTypeId
            );
          }),
          switchMap((maxObjectRight) => {
            if (
              maxObjectRight &&
              maxObjectRight.success &&
              maxObjectRight.data
            ) {
              const right = maxObjectRight.data;
              this.userHasViewRight = right >= SecurityType.VIEW;
              this.userHasAddRight = right >= SecurityType.ADD;
              this.userHasEditRight = right >= SecurityType.EDIT;
            }

            return this.getObjectNotes();
          })
        )
        .subscribe((notes) => {
          const objectNotes: ObjectNotes = notes.data;
          this.objectName = objectNotes.objectName;
          this.objectType = objectNotes.objectType;
          this.notes = objectNotes.notes;
          this.noteColumns = this.notesGridColumnsService.getNoteGridColumns();
          this.filter = this.notesGridColumnsService.getFilter();
          this.gridFilterValue = this.filter;
          this.showFilterBuilderPopUp = false;
        })
    );
  }

  searchNotes(searchCriteria: string) {
    this.searchText = searchCriteria;
    this.notesGrid.instance.searchByText(this.searchText);
  }

  addNote() {
    const dataToAddNote = {
      noteId: 0,
      dragPosition: this.dragPosition,
      objectId: this.objectId,
      objectTypeId: this.objectTypeId,
    };
    this.addupdateOpenDialog(dataToAddNote);
  }

  onGridCellKeyDown(value: any) {}

  onSelectionChanged(value: any) {}

  showFilterPopUp(e) {
    this.noteColumns = this.notesGrid.instance.getVisibleColumns();
    this.showFilterBuilderPopUp = true;
  }

  clearFilters() {
    this.filter = [];
    this.gridFilterValue = [];

    if (this.notesGrid && this.notesGrid.instance) {
      this.notesGrid.instance.clearFilter();
      this.notesGrid.instance.refresh();
    }
  }

  closeFilter(e) {
    this.showFilterBuilderPopUp = false;
  }

  applyFilter(e) {
    this.gridFilterValue = this.filter;
    this.notesGrid.instance.refresh();
    this.showFilterBuilderPopUp = false;
  }

  private getObjectNotes(): Observable<any> {
    return this.notesService.getObjectNotes(this.objectId, this.objectTypeId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public closeDeletePopup(e) {
    this.commonNoteId = null;
    this.isVisibleDeleteCommonNotePopUp = false;
  }

  public deleteNote(e) {
    this.commonNoteId = e;
    this.isVisibleDeleteCommonNotePopUp = true;
  }

  public showDeleteCommonNotePopUp(e) {
    if (e === true) {
      const delSuccess = this.notesService.deleteNotebyId(
        this.commonNoteId,
        this.objectId,
        this.objectTypeId
      );
      delSuccess.subscribe((res) => {
        if (res.success) {
          this.getObjectNotes().subscribe((notes) => {
            this.isVisibleDeleteCommonNotePopUp = false;
            this.notes = notes.data.notes;
          });
        }
      });
    }
  }

  public editNote(e) {
    this.commonNoteId = e;
    if (this.commonNoteId > 0) {
      const editNoteItem = this.notesService.getNotebyId(
        this.commonNoteId,
        this.objectId,
        this.objectTypeId
      );
      editNoteItem.subscribe((res) => {
        if (res.success) {
          const commonNoteItemArray = res.data;
          const commonNoteItem = commonNoteItemArray[0];
          const dataToEditDialog = {
            noteId: commonNoteItem.commonNoteID,
            dragPosition: this.dragPosition,
            objectId: commonNoteItem.objectID,
            objectTypeId: commonNoteItem.objectTypeID,
            commonNoteText: commonNoteItem.commonNote,
            selectedNoteTypeId: commonNoteItem.commonNoteTypeID,
          };
          this.addupdateOpenDialog(dataToEditDialog);
        }
      });
    }
  }

  private addupdateOpenDialog(dataToAddUpdateDialog: any) {
    let dialogHeight = '800px';
    let dialogWidth = '500px';
    let openDialogRef: MatDialogRef<any, any>;

    openDialogRef = this.dialog.open(AddNoteComponent, {
      height: dialogHeight,
      width: dialogWidth,
      panelClass: 'AddNoteDialog',
      data: dataToAddUpdateDialog,
      disableClose: true,
    });

    this.subs.push(
      openDialogRef
        .afterClosed()
        .pipe(
          filter((changesSaved) => !!changesSaved),
          switchMap((_) => this.getObjectNotes()),
          tap((notes) => {
            this.notes = notes.data.notes;
          })
        )
        .subscribe()
    );
  }
}
