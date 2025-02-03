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
        caption: 'Created By',
        name: 'CommonNoteCreatorName',
        dataType: 'string',
        dataField: 'commonNoteCreatorName',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
        visible: true,
      },
      {
        caption: 'Date Created',
        name: 'CommonNoteDateCreated',
        dataType: 'date',
        dataField: 'commonNoteDateCreated',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
        format: 'MM/dd/yyyy',
        visible: true,
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
        visible: true,
      },
      {
        caption: 'Note',
        name: 'Note',
        dataType: 'string',
        dataField: 'note',
        headerFilter: { allowSearch: true },
        width: '400px',
        alignment: 'left',
        allowFiltering: true,
        visible: true,
      },
      {
        caption: 'ID',
        name: 'CommonNoteID',
        dataType: 'number',
        dataField: 'commonNoteID',
        width: '80px',
        alignment: 'left',
        allowFiltering: true,
        visible: false,
      },
      {
        caption: 'Modified By',
        name: 'LastModifierName',
        dataType: 'string',
        dataField: 'lastModifierName',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
        visible: false,
      },
      {
        caption: 'Modified Date',
        name: 'LastModifiedDate',
        dataType: 'date',
        dataField: 'lastModifiedDate',
        width: '200px',
        alignment: 'left',
        allowFiltering: true,
        format: 'MM/dd/yyyy',
        visible: false,
      },
      {
        caption: 'Source Import ID',
        name: 'SourceImportID',
        dataType: 'string',
        dataField: 'sourceImportID',
        headerFilter: { allowSearch: true },
        allowFiltering: true,
        visible: false,
      },
    ];
    return columns;
  }

  // getFilter(): Condition {
  //   return [];
  // }
}
