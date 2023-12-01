/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Team, TeamMember, contactMember, MemberInfo } from '@mango/data-models/lib-data-models';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-edit-Team-popup',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.scss']
})

export class AddEditTeamComponent implements OnInit {
  @ViewChild("SelectedMembersGrid") selectedMembersGrid: DxDataGridComponent;
  public modalTitle: string;
  public modalId: string = "addEditTeamModal";
  public closeButton = true;

  dateFormat: string;
  dateTimeFormat: string;
  filteredMembers: contactMember[];
  teamName: string;
  team: Team;
  teamMembers: TeamMember[];
  memberInfo: MemberInfo;
  selectedMemberIds: number[];
  selectedMembers: TeamMember[];
  searchMember: string;
  inputSubscription$;
  isDropDownBoxOpened = false;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  initLoad: boolean = true;
  teamFunction: string;
  noDataText: string = "No members added yet.  Add members to get started.";
  removeDisabled: boolean = true;
  addTeam: boolean = false;
  changesMade: boolean = false;

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private dashboardService: DashboardService,
    public toastr: ToastrService,
    public dialogRef: MatDialogRef<AddEditTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    let allMembers =  false;
    let pageSize = 10;
    let pageNumber = 1;

    this.memberInfo  = this.data.memberInfo;
    this.team = <Team>{};
    this.team.teamMembers = [];
    if(this.data.teamFunction == "add") {
      this.modalTitle = "Add Team"
      this.addTeam = true;
      this.team.teamName = "";
    } else {
      this.team.teamId = this.data.team.teamId;
      this.team.teamName = this.data.team.teamName;
      this.team.securityLevel = this.data.team.securityLevel;
      this.data.team.teamMembers.forEach(member => this.team.teamMembers.push(Object.assign({}, member)));
      this.modalTitle = "Edit Team";
    }

    this.membersSearchInput$.pipe(
      debounceTime(250),
      switchMap(inputValue => ((inputValue.length != 1) ? this.getMembers(inputValue, allMembers, pageSize, pageNumber) : of([])))
    ).subscribe(filteredMembers => {
      this.filteredMembers = filteredMembers;
      allMembers = true;
      pageNumber = 0;
      pageSize = 0;
    });

  }

  searchTeamMembers(val: string) {
    this.membersSearchInput$.next(val)
  }

  focusOnDropDownInput(e) { 
    this.isDropDownBoxOpened = false; 
    setTimeout(function() {  
        e.component.focus();  
    });  
    this.isDropDownBoxOpened = true;
  } 

  teamNameChange(teamName: string) {
    this.teamName = teamName;
    this.team.teamName = teamName;
    this.changesMade = true;
  }

  toggleList(){
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }

  removeMember(contactId) {
    this.team.teamMembers = this.team.teamMembers.filter( member => member.contactId !== contactId);
    this.filteredMembers = [...this.filteredMembers]; //to re-render the list and set attributes
    this.changesMade = true;
  }

  removeMembers() {
    let confirmText = "Do you want to Remove the members?\n"
    this.selectedMembers.forEach(member => {
      confirmText += member.name + "\n";
    })

    if(confirm(confirmText)) {
      let removeIndex: number;
      this.selectedMemberIds.forEach(contactId => {
        removeIndex = (this.team.teamMembers.findIndex(member => contactId == member.contactId));
        this.team.teamMembers.splice(removeIndex, 1);
      });
      this.filteredMembers = [...this.filteredMembers];
      this.changesMade = true;
    }
  }

  setRoleValue(newData, value: string) {
    (this as any).defaultSetCellValue(newData, value);
    this.changesMade = true;
  }

  setLevelValue(newData, value: string) {
		newData.level = value;
    this.changesMade = true;
  }

  emailtoggle(member, e) {
    member.emailOn = e.checked;
    this.changesMade = true;
  }

  onItemRendered(e) {
    if(this.team.teamMembers && this.team.teamMembers.length) {
      this.team.teamMembers.forEach(member => {
        if(member.contactId == e.itemData.contactID) {
          this.setListItemAttributes(e);
        }
      })
    }
  }

  onItemClicked(e) {
    let teamMember = <TeamMember>{};
    teamMember.company = e.itemData.Company;
    teamMember.email = e.itemData.Email;
    teamMember.name = e.itemData.Name;
    teamMember.companyId = e.itemData.companyID;
    teamMember.contactId = e.itemData.contactID;
    teamMember.phoneNumber = "";
    teamMember.emailOn = false;
    teamMember.role = "";
    teamMember.level = "L1";
    teamMember.memberId= 0;
    teamMember.teamId = 0;
    teamMember.share = 0;

    this.team.teamMembers.push(teamMember);
    this.changesMade = true;
    this.setListItemAttributes(e);
  }

  onMemberSelectionChanged(e) {
    this.selectedMemberIds = e.selectedRowKeys;
    this.selectedMembers = e.selectedRowsData;
    if((this.selectedMemberIds.length) > 1 ) 
      this.removeDisabled = false;
    else {
      this.removeDisabled = true;
    }  
  }

  setAttributes(e) {  
    if(this.initLoad) {
      this.selectedMembersGrid.instance.refresh(); //this adjusts the uneven heights of the coloumns
      this.initLoad = false;
    }  

    setTimeout(() => {
      const inputElements = Array.from(document.getElementsByClassName('dx-texteditor-input'));
      inputElements?.forEach(ele => {
        ele.setAttribute('aria-label', 'select option');
        ele.setAttribute('name', 'selectionOption');
      })
    })
  }

  saveTeam() {

    if (!this.team.teamName.trim()) {
      alert("Team Name is a required field");
      return;
    }
    else if(!this.team.teamMembers || !this.team.teamMembers.length) {
      alert("Add team member in order to save.");
      return;
    } else {
        if(this.addTeam) {
          this.team.teamId = 0;
          this.team.securityLevel = "Delete"
        }
        this.dashboardService.addTeam(this.team).subscribe(
        (res:any) => {
          if(res.success){
            this.toastr.info("Team Saved Successfully", "", 
                             {positionClass: 'toast-bottom-right', timeOut: 3000, closeButton:false, progressBar: false });
            this.dialogRef.close('true');
          }
        },
        (error: any) => alert("Failed Saving Team, Try again later "),
        () => {}
      );
    }
  }

  public closeDialog() {
    this.dialogRef.close('');
  }

  setListItemAttributes(e) {
    const listItem = e.itemElement as HTMLElement;
    listItem.style.pointerEvents = 'none';
    listItem.classList.add('aet-itemDisabled');
  }


  getMembers(search: string, all: boolean, pageSize: number, pageNumber: number) {
    return this.dashboardService.getMembersList(search, all, pageSize, pageNumber).pipe(
      map(res => res.data),
      catchError(error => {
        console.log("ERROR occurred while getting Members List: ", error);
        return of(error);
      }
      )
    );
  }
  
  ngOnDestroy() {
    this.membersSearchInput$.unsubscribe();
  }

}

