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
  team: Team;
  teamMembers: TeamMember[];
  memberInfo: MemberInfo;
  searchMember: string;
  inputSubscription$;
  isDropDownBoxOpened = false;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  initLoad: boolean = true;
  teamFunction: string;
  noDataText: string = "No Data";

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddEditTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.teamMembers = this.data.team.teamMembers;
    this.memberInfo  = this.data.memberInfo;
    if(this.data.teamFunction == "add") {
      this.modalTitle = "Add Team"
      this.noDataText = "No members added yet.  Add members to get started.";
    } else {
      this.modalTitle = "Edit Team";
    }

    this.membersSearchInput$.pipe(
      debounceTime(250),
      switchMap(inputValue => ((inputValue && inputValue.length > 1) ? this.getMembers(inputValue) : of([])))
    ).subscribe(filteredMembers => this.filteredMembers = filteredMembers)
  }

  teamNameChange(teamName: string) {
  }

  membersSearch() {

  }

  toggleList(){
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }

  removeMembers() {

  }

  emailtoggle(e) {

  }

  selectedMember(e) {

  }

  searchTeamMembers(e) {
    this.membersSearchInput$.next(e.event.target.value)
  }

  getMembers(search: string) {
    return this.dashboardService.getMembersList(search, true, 0, 0).pipe(
      map(res => res.data),
      catchError(error => {
        console.log("ERROR occurred while getting Members List: ", error);
        return of(error);
      }
      )
    );
  }

  getmemberinfo() {
    this.memberInfo = {
      roles: [],
      levels: []
    };

    this.dashboardService.getmemberinfo().subscribe(
      (res:any) => {
        this.memberInfo = res.data;
      },
      (error: any) => console.log("Error occurred getting Teams Data ", error),
      () => {}
    );
  }

  addMember(member) {
    member.added = true;
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

  }

  public closeDialog() {
    this.dialogRef.close('');
  }
  
  ngOnDestroy() {
    this.membersSearchInput$.unsubscribe();
  }

}

