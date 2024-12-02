import { Injectable } from '@angular/core';

export type Condition = Condition[] | string | number;

@Injectable({
  providedIn: 'root',
})
export class NotesGridColumnsService {
  constructor() {}

  getNoteGridColumns() {
    const columns = [
      {
        caption: 'ID',
        name: 'CommonNoteID',
        dataType: 'number',
        dataField: 'commonNoteID',
        width: '80px',
        alignment: 'left',
        allowFiltering: true,
        sortOrder: 'desc',
      },
      {
        caption: 'Note Type',
        name: 'CommonNoteType',
        dataType: 'string',
        dataField: 'commonNoteType',
        headerFilter: { allowSearch: true },
        width: '150px',
        alignment: 'left',
        allowFiltering: true,
      },
      {
        caption: 'Note',
        name: 'ShortNoteText',
        dataType: 'string',
        dataField: 'shortNoteText',
        headerFilter: { allowSearch: true },
        width: '400px',
        alignment: 'left',
        allowFiltering: true,
      },
      {
        caption: 'Created By',
        name: 'CommonNoteCreatorName',
        dataType: 'string',
        dataField: 'commonNoteCreatorName',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
      },
      {
        caption: 'Date Created',
        name: 'CommonNoteDateCreated',
        dataType: 'date',
        dataField: 'commonNoteDateCreated',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
        format: 'MM/dd/yyyy hh:mm:ss a',
      },
      {
        caption: 'Modified By',
        name: 'LastModifierName',
        dataType: 'string',
        dataField: 'lastModifierName',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
      },
      {
        caption: 'Modified Date',
        name: 'LastModifiedDate',
        dataType: 'date',
        dataField: 'lastModifiedDate',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
        format: 'MM/dd/yyyy hh:mm:ss a',
      },
      {
        caption: 'Source Import ID',
        name: 'SourceImportID',
        dataType: 'string',
        dataField: 'sourceImportID',
        headerFilter: { allowSearch: true },
        allowFiltering: true,
      },
    ];
    return columns;
  }

  getFilter(): Condition {
    return [];
  }
}
