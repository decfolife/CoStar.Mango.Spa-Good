import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import {
  Api,
  CommonNote,
  SecurityType,
} from '@mango/data-models/lib-data-models';

@Injectable()
export class NotesService extends EndpointService {
  objectActionsUrl: string = UtilitiesService.getBaseApiUrl(Api.objectActions);

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  hasObjectRights(
    objectId: number,
    objectTypeId: number,
    securityType: SecurityType
  ): Observable<any> {
    const url = `${this.objectActionsUrl}objectactions/hasobjectrights/${objectId}/${objectTypeId}/${securityType}`;
    return this.callHttpGet(url, 'getNotesPageRight');
  }

  hasNotesPageRight(navPageId: number): Observable<any> {
    const url = `${this.objectActionsUrl}objectactions/getnavpagerights/${navPageId}`;
    return this.callHttpGet(url, 'getNotesPageRight');
  }

  getMaxObjectRight(objectId: number, objectTypeId: number): Observable<any> {
    const url = `${this.objectActionsUrl}objectactions/getusermaxobjectright/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'getMaxObjectRight');
  }

  getObjectNotes(
    objectId: number,
    objectTypeId: number,
    NoteTypeId?: number
  ): Observable<any> {
    const url = NoteTypeId
      ? `${this.objectActionsUrl}objectcommonnote/notes/${objectId}/${objectTypeId}/${NoteTypeId}`
      : `${this.objectActionsUrl}objectcommonnote/notes/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'getNotesList');
  }

  deleteNotebyId(
    commonNoteId: number,
    objectId: number,
    objectTypeId: number
  ): Observable<any> {
    const url = `${this.objectActionsUrl}objectcommonnote/deletenote/${commonNoteId}/${objectId}/${objectTypeId}`;
    return this.callHttpDelete(url, 'deleteCommonNotebyId');
  }
  getNotebyId(
    commonNoteId: number,
    objectId: number,
    objectTypeId: number
  ): Observable<any> {
    const url = `${this.objectActionsUrl}objectcommonnote/getnote/${commonNoteId}/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'getCommonNotebyId');
  }

  saveNote(
    objectId: number,
    objectTypeId: number,
    noteId: number,
    commonNoteTypeId: number,
    commonNote: string
  ) {
    const url = `${this.objectActionsUrl}objectcommonnote/AddUpdateNote`;
    return this.callHttpPost(url, 'saveNote', {
      objectId,
      objectTypeId,
      noteId,
      commonNoteTypeId,
      commonNote,
    });
  }

  getCommonNoteTypes(): Observable<any> {
    const url = `${this.objectActionsUrl}objectcommonnote/getCommonNoteTypes`;
    return this.callHttpGet(url, 'getCommonNoteTypes');
  }
}
