import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { DxPopupComponent } from 'devextreme-angular';

import { NotesService } from './notes.service';
import { CommonNote } from '../shared/models';
import { DropdownComponent } from '@mango/ui-shared/lib-ui-elements';

export interface Note {
  author: string;
  text: string;
  timestamp: Date;
  noteType: NoteType;
}

interface NoteType {
  id: number;
  name: string;
}

const MAX_CHARS_IN_NOTE = 7000;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnChanges {
  noteTypes: NoteType[] = [];
  previousNotes: Note[];
  allPreviousNotes: Note[];

  newNote: Note;
  showAll: boolean;
  disabled: boolean;
  hasTypeError: boolean;
  hasNoteError: boolean;
  remainingChars: number;

  @Input() showPopup = false;
  @Output() showPopupChange = new EventEmitter<boolean>();

  @Input() noteData: any;

  @Output() noteSaved = new EventEmitter<CommonNote>();

  @ViewChild('newNotePopup') popup: DxPopupComponent;
  @ViewChild(DropdownComponent) noteTypeDropdown: DropdownComponent

  constructor(private service: NotesService) {
    this.initValues();
  }

  ngOnInit() {
    this.service.getNoteTypes().subscribe(res => {
      const data = res.data.noteTypes;

      data.forEach((noteType: any) => {
        this.noteTypes.push({
          id: noteType.commonNoteTypeId,
          name: noteType.commonNoteType
        });
      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showPopup?.currentValue === false) {
      this.initValues();
    }

    if (changes.noteData?.currentValue !== changes.noteData?.previousValue) {
      this.service.getNotes(this.noteData.OID, this.noteData.OTID, this.noteData.CommonNoteTypeID)
        .subscribe((res: any) => {
          this.previousNotes = [];
          this.allPreviousNotes = [];
          res.data.commonNotes.forEach((item: any) => {
            this.previousNotes.push({
              author: item.creator,
              text: this.convertCarriageReturnsToBR(item.note),
              timestamp: new Date(item.commonNoteDateCreated),
              noteType: { id: item.commonNoteTypeId, name: item.commonNoteType }
            });
            this.allPreviousNotes.push({
              author: item.creator,
              text: this.convertCarriageReturnsToBR(item.note),
              timestamp: new Date(item.commonNoteDateCreated),
              noteType: { id: item.commonNoteTypeId, name: item.commonNoteType }
            });

          });
        });
    }
  }

  saveNote() {
    const noteLengthIsZero = this.newNote.text.length === 0;
    const noteTypeNull = this.newNote.noteType === null;

    if (noteTypeNull || noteLengthIsZero) {
      this.disabled = false;
      this.hasTypeError = noteTypeNull;
      this.hasNoteError = noteLengthIsZero;

      return;
    }

    //Copy here because this.newNote is bound to the html and we don't want
    //<br>'s to magically show up in the bound text area. Copy it, convert all CR/LF's to <br>s and 
    //save the copy to DB
    const noteToSave: Note = {
      author: this.newNote.author,
      text: this.convertBRToCarriageReturns(this.newNote.text),
      timestamp: this.newNote.timestamp,
      noteType: this.newNote.noteType
    };

    this.service.createNote(this.noteData, noteToSave)
      .subscribe(res => {
        this.noteSaved.emit(res.data);
        this.popup.instance.hide();
      },

        () => {
          this.disabled = false;
        });
  }

  calculateCharactersRemaining(evt: any) {
    this.remainingChars = MAX_CHARS_IN_NOTE - evt.target.value.length;

    if (this.remainingChars < 0) {
      this.remainingChars = 0;
      evt.target.value = evt.target.value.slice(0, MAX_CHARS_IN_NOTE);
    }
  }

  getTitle() {
    return 'Add New Note';
  }

  onHide() {
    this.noteTypeDropdown.resetSelections()
    this.showPopupChange.emit(false);
  }

  initValues() {
    this.disabled = false;
    this.showAll = false;
    this.hasTypeError = false;
    this.hasNoteError = false;

    this.previousNotes = [];
    this.newNote = {
      author: null,
      text: '',
      timestamp: null,
      noteType: null
    };

    this.remainingChars = MAX_CHARS_IN_NOTE;
  }

  convertCarriageReturnsToBR(source: string) {
    return source.replace(/\r?\n|\r/g, '<br>');
  }
  convertBRToCarriageReturns(source: string) {
    return source.replace(/<br\s*[\/]?>/gi, '\n');
  }

  noteTypesSelected(noteTypes: NoteType[]): void {
    if (noteTypes) {
      const selectedNoteType: NoteType = noteTypes[0]
      this.newNote.noteType = selectedNoteType
    }
  }

  onShowing(event): void {
    event.component._$content.addClass('notes-popup-wrapper')
  }
}

