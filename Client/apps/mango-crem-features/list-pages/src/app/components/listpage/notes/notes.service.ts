import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/mango/src/environments/environment.local';

import { catchError, map } from 'rxjs/operators';

import { EndpointService } from '../core/services/endpoint.service';
import { Note } from './notes.component';

@Injectable()
export class NotesService extends EndpointService {

  getNoteTypes() {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}NoteTypes`;

      return this.http.get(url, this.httpOptions).pipe(
        map(x => this.toObject(x)),
        catchError(this.handleError('getNoteTypes'))
      );
    }

    const url = `${environment.appUrls.listpages}GetNoteTypes`;

    return this.http.post(url, '{}', this.httpOptions).pipe(
      map(x => this.toObject(x)),
      catchError(this.handleError('getNoteTypes'))
    );
  }

  getNotes(OID: number, OTID: number, CommonNoteTypeID: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}Notes/${OID}/${OTID}/${CommonNoteTypeID}`;

      return this.http.get(url, this.httpOptions).pipe(
        map(x => this.toObject(x)),
        catchError(this.handleError('getNotes'))
      );
    }

    const url = `${environment.appUrls.listpages}GetNotes`;

    return this.http.post(
      url, `{ "request": { "OID":${OID}, "OTID":${OTID}, "CommonNoteTypeID":${CommonNoteTypeID} } }`, this.httpOptions
    ).pipe(
      map(x => this.toObject(x) as any),
      catchError(this.handleError('getNotes'))
    );
  }

  createNote(noteData: any, note: Note) {
    const body = {
      ObjectId: +noteData.OID,
      ObjectTypeId: +noteData.OTID,
      CommonNoteTypeId: +note.noteType.id,
      CommonNote: note.text,
    };

    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}Notes`;

      return this.http.post(url, body, this.httpOptions)
        .pipe(
          map(x => this.toObject(x)),
          catchError(this.handleError('createNote'))
        );
    }

    const url = `${environment.appUrls.listpages}CreateNote`;

    return this.http.post(
      url, `{ "request": ${JSON.stringify(body)} }`, this.httpOptions
    ).pipe(
      map(x => this.toObject(x)),
      catchError(this.handleError('createNote'))
    );
  }
}
