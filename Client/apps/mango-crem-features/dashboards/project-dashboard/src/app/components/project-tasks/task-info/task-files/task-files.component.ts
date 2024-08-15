import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ContactRecord, TaskFileInfo } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mango-task-files',
  templateUrl: './task-files.component.html',
  styleUrls: ['./task-files.component.scss']
})
export class TaskFilesComponent implements OnInit {
  @Input() taskFiles : TaskFileInfo[];
  @Input() userDateFormat : string;
  filesCount : number = 0;
  fileIconList = [ 
    { type: "pdf", icon: "faFilePdf" },
    { type: "csv", icon: "faFileCsv" },
    { type: "jpg", icon: "faFileImage" },
    { type: "png", icon: "faFile" },
    { type: "ppt", icon: "faFile" },
    { type: "xlsx", icon: "faFileExcel"},
    { type: "txt", icon: "faFile" }
  ];
  isUserDatesEU: boolean = true;
  currentUserInfo$: Observable<ContactRecord>;
  subs: Subscription[] = [];
  
  constructor(private facade: MangoAppFacade) {}
  ngOnInit(): void {
    this.currentUserInfo$ = this.facade.contactRecord$;
    this.subs.push(this.currentUserInfo$.subscribe(contact => {
      this.isUserDatesEU = contact.preferences.contactDatesEU;
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!!changes.taskFiles && !!changes.taskFiles.currentValue) {
      this.filesCount = this.taskFiles.length;
      this.taskFiles.forEach((file) => {
        let extension =  file.fileName ? file.fileName.split('.').pop() : '';
        let iconObj = this.fileIconList.find(obj => obj['type'] == extension.toLowerCase().trim());
        file.icon = iconObj ? iconObj['icon'] : "faFile";
      });
    }
  }
}
