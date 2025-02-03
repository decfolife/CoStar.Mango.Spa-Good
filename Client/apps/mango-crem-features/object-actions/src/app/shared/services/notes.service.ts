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

  getObjectNotes(
    objectId: number,
    objectTypeId: number,
    objectTypeTypeId: number,
    parentObjectId?: number,
    parentObjectTypeId?: number
  ): Observable<any> {
    const url =
      parentObjectId > 0
        ? `${this.objectActionsUrl}objectcommonnote/notes?ObjectId=${objectId}&ObjectTypeId=${objectTypeId}&ObjectTypeTypeId=${objectTypeTypeId}&ParentObjectId=${parentObjectId}&ParentObjectTypeId=${parentObjectTypeId}`
        : `${this.objectActionsUrl}objectcommonnote/notes?ObjectId=${objectId}&ObjectTypeId=${objectTypeId}&ObjectTypeTypeId=${objectTypeTypeId}`;
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
