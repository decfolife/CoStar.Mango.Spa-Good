/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Team, TeamMember, contactMember } from '@mango/data-models/lib-data-models';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'add-Team-popup',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})

export class AddTeamComponent implements OnInit {
  @ViewChild("SelectedMembersGrid") selectedMembersGrid: DxDataGridComponent;
  public modalTitle: string = 'Add Team';
  public modalId: string = "addTeamModal";
  public closeButton = true;

  dateFormat: string;
  dateTimeFormat: string;
  filteredMembers: contactMember[];
  team: Team;
  teamMembers: TeamMember[];
  searchMember: string;
  inputSubscription$;
  isDropDownBoxOpened = false;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  initLoad: boolean = true;

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getTeamMembers();

    this.membersSearchInput$.pipe(
      debounceTime(250),
      switchMap(inputValue => ((inputValue && inputValue.length > 1) ? this.getMembers(inputValue) : of([])))
    ).subscribe(filteredMembers => this.filteredMembers = filteredMembers)
  }

  teamNameChange(teamName: string) {
  }

  membersSearch() {

  }

  removeMembers() {

  }

  emailtoggle(e) {

  }

  selectedMember(e) {
    console.log(`input value ${e}`)
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


  addMember(member) {
    member.added = true;
  }

  updateDimentions() {  
    if(this.initLoad) {
      this.selectedMembersGrid.instance.refresh(); //this adjusts the uneven heights of the coloumns
      this.initLoad = false;
    }  
  }

  saveTeam() {

  }

  public closeDialog() {
    this.dialogRef.close('');
  }


  getTeamMembers() {   //tempcode, will delete it as part of the next story
    this.teamMembers = [
      {
        name: "James Adams",
        company: "Some Company",
        memberId: 111,
        email: "myEmail@gmail.com",
        emailOn: true,
        role: "what role",
        level: "L1",
      },
      {
        name: "James Adams",
        company: "Some Company",
        memberId: 112,
        email: "myEmail@gmail.com",
        emailOn: true,
        role: "what role",
        level: "L1",
      },
      {
        name: "James Adams",
        company: "Some Company",
        memberId: 113,
        email: "myEmail@gmail.com",
        emailOn: true,
        role: "what role",
        level: "L1",
      },
      {
        name: "James Adams",
        company: "Some Company",
        memberId: 114,
        email: "myEmail@gmail.com",
        emailOn: true,
        role: "what role",
        level: "L1",
      },
      {
        name: "James Adams",
        company: "Some Company",
        memberId: 115,
        email: "myEmail@gmail.com",
        emailOn: true,
        role: "what role",
        level: "L1",
      },
      {
        name: "James Adams",
        company: "Some Company",
        memberId: 116,
        email: "myEmail@gmail.com",
        emailOn: true,
        role: "what role",
        level: "L1",
      },
      {
        name: "James Adams",
        company: "Some Company",
        memberId: 117,
        email: "myEmail@gmail.com",
        emailOn: true,
        role: "what role",
        level: "L1",
      }
    ]  
  }
  
  ngOnDestroy() {
    this.membersSearchInput$.unsubscribe();
  }

}
