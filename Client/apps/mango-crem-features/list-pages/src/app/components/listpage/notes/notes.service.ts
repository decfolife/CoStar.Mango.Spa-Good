import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Note } from './notes.component';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class NotesService extends EndpointService {
  listpages: string = UtilitiesService.getBaseApiUrl(Api.listpages);
  getNoteTypes() {
    return this.callHttpGet(
      `${this.listpages}listpage/notetypes`,
      'getNoteTypes'
    );
  }

  getNotes(OID: number, OTID: number, CommonNoteTypeID: number) {
    return this.callHttpGet(
      `${this.listpages}listpage/notes/${OID}/${OTID}/${CommonNoteTypeID}`,
      'getNotes'
    );
  }

  createNote(noteData: any, note: Note) {
    return this.callHttpPost(`${this.listpages}listpage/notes`, 'createNote', {
      ObjectId: +noteData.OID,
      ObjectTypeId: +noteData.OTID,
      CommonNoteTypeId: +note.noteType.id,
      CommonNote: note.text,
    });
  }
}
