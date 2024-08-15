/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ContactRecord, ProjectTemplate, ProjectTemplateTask } from '@mango/data-models/lib-data-models';
import { InputComponent } from '@mango/ui-shared/lib-ui-elements';
import { CardsService } from '@project-dashboard/services/cards.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'copy-transaction-popup-content',
  templateUrl: './copy-transaction.component.html',
  styleUrls: ['./copy-transaction.component.scss']
})

export class CopyTransactionComponent implements OnInit, OnChanges {
  @Input() projectId: number;
  @Output() copySuccessfulEvent: EventEmitter<boolean> = new EventEmitter();

  projectName: string = "";
  selectedTemplateName: string;
  selectedTemplateId: number = 0;
  projectTemplatesList: ProjectTemplate[] = [];
  projectTemplateTaskList: ProjectTemplateTask[] = [];
  nullObject: ProjectTemplate = {projectTemplateID: 0, projectTemplateName: " "};

  selectTasks: boolean = false;
  selectApprovers: boolean = false;
  selectTaskNotes: boolean = false;
  selectTaskFiles: boolean = false;
  selectTeamMembers: boolean = false;
  selectProjectFolders: boolean = false;
  selectProjectFiles: boolean = false;
  selectPreferences: boolean = false;
  selectReminders: boolean = false
  selectProjectNotes: boolean = false;
  calculateDates: boolean = false;
  daysCalculatedBy: boolean = false;
  displayPreview: boolean = false;
  disableOption: boolean = false;
  buttonText: string =  "Preview";
  copySuccessful: boolean = false;
  copyValues: any = {tasks: 128, approvers: 1024, taskNotes: 16384, taskFiles: 32768, 
                     teamMembers: 4, projectFolders: 256, projectFiles: 512, projectNotes: 8192, 
                     preferences: 2, reminders: 2048 
                    };

  @ViewChild("ProjectNameTextBox") projectNameTextBox: InputComponent;
  private currentUserInfo$: Observable<ContactRecord>;
  subs: Subscription[] = [];


  constructor(private dashboardService: DashboardService,
    private cardsService: CardsService,
    private dialogService: MangoDialogService,) {
   
   }

  ngOnInit(): void {
    this.projectTemplatesList.push(this.nullObject);
    this.getProjectTemplates();
  }
  
  ngOnChanges(changes: SimpleChanges) : void {
   
  }

  resetPopup() {
    this.displayPreview = false;
    this.buttonText = "Preview";
  }

  onProjectNameChange(e) {
    this.projectName = e.value;
  }
  
  onSelectedTemplateChanged(e) {
    if(e[0].projectTemplateID) {
      this.selectedTemplateId = e[0].projectTemplateID;
      this.selectedTemplateName = e[0].projectTemplateName;
      this.disableOption = true;
      this.getProjectTemplateTasks(this.selectedTemplateId);
      this.selectTasks = false;
      this.selectApprovers = false;
      this.selectTaskNotes = false;
      this.selectTaskFiles = false;
    } else {
      this.selectedTemplateId = null;
      this.selectedTemplateName = null;
      this.projectTemplateTaskList = [];
      this.disableOption = false;
    }
    
  }

  copyTranToggleChanged(e, option) {
    this[option] = e.checked;
  }

  OnCheckboxChangeEvent(e, option) {
    if(!e.event) {
      return;
    }

    this[option] = e.value;

    if(option == "selectTasks") {
      if (e.value == false) {
        this.selectApprovers = false;
        this.selectTaskNotes = false;
        this.selectTaskFiles = false;
      } 
    } 

    if(option == "selectApprovers" || option  == "selectTaskNotes" || option == "selectTaskFiles") {
      if(e.value == true) {
        this.selectTasks = true;
        if(option == "selectTaskFiles") {
          this.selectProjectFolders = true;
          this.selectProjectFiles = true;
        }
        if(option == "selectApprovers") {
          this.selectTeamMembers = true;
        }
      } 
    }


    if (e.value == false && option == "selectProjectFolders") {
        this.selectProjectFiles = false;
    }

    if (e.value == true && option == "selectProjectFiles") {
      this.selectProjectFolders = true;
     }

  }

  transPreviewClicked() {
    this.displayPreview = !this.displayPreview;
    this.buttonText = this.displayPreview ? "Close Preview" : "Preview" ;
  }

  validateAndApplyChanges() {
    this.projectName = this.projectName.trim();
    !this.projectNameTextBox.validate() ?  this.projectNameTextBox.focusTextBox() : this.copyTransaction();
  }

  getProjectTemplates() {
    this.subs.push(this.dashboardService.getProjectTemplateList().subscribe(
      (res:any) => {
        if(res && res.success) {
          if(res.data.length) {
            this.projectTemplatesList = this.projectTemplatesList.concat(res.data);
          }
        }
        else {
          this.dialogService.alert('Get Project Template Error', 'There was an issue with getting the Project Template Info. Please contact the system administrator.', 'OK');
        }
      }
    ));
  }

  getProjectTemplateTasks(templateId: number) {
    this.subs.push(this.dashboardService.getProjectTemplateTaskList(templateId).subscribe(
      (res:any) => {
        if(res && res.success) {
          this.projectTemplateTaskList = res.data;
        }
        else {
          this.dialogService.alert('Get Project Template Tasks Error', 'There was an issue with getting the Project Template Tasks Info. Please contact the system administrator.', 'OK');
        }
      }
    ));
  }

  copyTransaction() {
    let copyParm = this.calcParmVal();
    let copyProject = {
      projectID: this.projectId,
      projectName: this.projectName,
      templateId: this.selectedTemplateId,
      copyParm: copyParm,
      byWorkDays: this.daysCalculatedBy,
      autoCalc: true,
      calcDays: this.calculateDates
    }

    this.subs.push(this.dashboardService.postCopyProject(copyProject).subscribe(
      (res:any) => {
        if(res && res.success) {
          this.copySuccessful = true;
          this.copySuccessfulEvent.emit(true);
        }
        else {
          this.copySuccessfulEvent.emit(false);
          this.dialogService.alert('Post Copy Transaction Error', 'There was an issue with Copy Transaction operation. Please contact the system administrator.', 'OK');
        }
      }
    ));
    
  }

  calcParmVal() {
    let copyParm = 0;
    copyParm += this.selectTasks ? this.copyValues.tasks : 0;
    copyParm += this.selectApprovers ? this.copyValues.approvers : 0;
    copyParm += this.selectTaskNotes ? this.copyValues.taskNotes : 0;
    copyParm += this.selectTaskFiles ? this.copyValues.taskFiles : 0;
    copyParm += this.selectTeamMembers ? this.copyValues.teamMembers : 0;
    copyParm += this.selectProjectFolders ? this.copyValues.projectFolders : 0;
    copyParm += this.selectProjectFiles ? this.copyValues.projectFiles : 0;
    copyParm += this.selectProjectNotes ? this.copyValues.projectNotes : 0;
    copyParm += this.selectPreferences ? this.copyValues.preferences : 0;
    copyParm += this.selectReminders ? this.copyValues.reminders : 0;
    return copyParm;
  }

  adaAttrToGridTable(e:any) {
    let noDataEl = e.element.getElementsByTagName("tbody");
    noDataEl[0]?.setAttribute("role", "table");
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

}
