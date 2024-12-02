import { Component, Input, SimpleChanges } from '@angular/core';
import { TaskCommonNote } from '@mango/data-models/lib-data-models';
import { Subject } from 'rxjs';

@Component({
  selector: 'mango-task-notes',
  templateUrl: './task-notes.component.html',
  styleUrls: ['./task-notes.component.scss'],
})
export class TaskNotesComponent {
  @Input() taskNotes: TaskCommonNote[];
  @Input() userDateFormat: string;
  @Input() clickedSubject: Subject<any>;

  noteTextAreas: any[] = [];

  constructor() {}

  ngOnInit() {
    //The notes tab has to be visible in order to get the textarea elements
    this.clickedSubject.subscribe(() => {
      setTimeout(this.adjustTextAreaHeight.bind(this), 100);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.taskNotes) {
      this.noteTextAreas = [];
    }
  }

  onContentReady(e) {
    this.updateNotesGridBackgroundStyle(e);
    this.adjustTextAreaHeight();
  }

  onInitializedTextArea(e) {
    this.noteTextAreas.push(e);
  }

  private adjustTextAreaHeight() {
    //We want to adjust the height when a note is saved or when the notes are first loaded and the user clicks the notes tab
    this.noteTextAreas.forEach((nta) => {
      let foundElement = nta.element.querySelectorAll('textarea')[0];
      if (
        !!foundElement &&
        foundElement.scrollHeight <= foundElement.clientHeight
      )
        nta.component.option('height', 'fit-content');
    });
  }

  private updateNotesGridBackgroundStyle(e) {
    //make the detail record the same background as the master record
    let gridRows = e.element.querySelectorAll(
      'tr.dx-row:not(.dx-row.dx-freespace-row,.dx-row.dx-header-row)'
    );
    for (let i = 0; i < gridRows.length; i++) {
      const masterRow = gridRows[i];
      i++;
      const detailRow = gridRows[i];

      if (!!detailRow && detailRow.childNodes.length > 0) {
        let textAreaNode: any = detailRow.childNodes[0];

        if (masterRow.classList.contains('dx-row-alt')) {
          textAreaNode.style.setProperty('background-color', '#f8f8f8');
        } else {
          textAreaNode.style.setProperty('background-color', 'unset');
        }
      }
    }
  }

  adaAttrNoDataGrid(e: any) {
    const dxGridwithTables = e.component
      .$element()
      .find('.dx-datagrid-headers.dx-bordered-top-view');
    if (dxGridwithTables && dxGridwithTables.length > 0) {
      for (let i = 0; i < dxGridwithTables.length; i++) {
        const element = dxGridwithTables[i];
        if (element) {
          element.setAttribute('role', 'grid');
        }
      }
    }
  }
}
