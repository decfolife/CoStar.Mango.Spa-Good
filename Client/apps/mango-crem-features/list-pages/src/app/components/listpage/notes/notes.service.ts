import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Note } from './notes.component';

@Injectable()
export class NotesService extends EndpointService {

  getNoteTypes() {
    return this.callHttpGet(`${environment.appUrls.listpages}NoteTypes`, 'getNoteTypes')
  }

  getNotes(OID: number, OTID: number, CommonNoteTypeID: number) {
    return this.callHttpGet(`${environment.appUrls.listpages}Notes/${OID}/${OTID}/${CommonNoteTypeID}`, 'getNotes')
  }

  createNote(noteData: any, note: Note) {
    return this.callHttpPost(`${environment.appUrls.listpages}Notes`, 'createNote', {
      ObjectId: +noteData.OID,
      ObjectTypeId: +noteData.OTID,
      CommonNoteTypeId: +note.noteType.id,
      CommonNote: note.text,
    })
  }
}
