/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCirclePlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MemberInfo, TeamMember, contactMember } from '@mango/data-models/lib-data-models';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';

@Component({
  selector: 'add-edit-member-popup',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss']
})

export class AddEditMemberComponent implements OnInit {
  public modalTitle = "Add Team Member";
  public modalId: string = "addEditMemberModal";
  public closeButton = true;
  isDropDownBoxOpened = false;


  teamMembers: TeamMember[];
  filteredMembers: contactMember[];
  memberInfo: MemberInfo;
  labelPosition = 'before';
  faCirclePlus = faCirclePlus;
  faInfoCircle = faInfoCircle;
  

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private dashboardService: DashboardService,

    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddEditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    let allMembers =  false;
    let pageSize = 10;
    let pageNumber = 1;
    this.memberInfo  = this.data.memberInfo;

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

  onItemClicked(e) {
  }

  focusOnDropDownInput(e) { 
    this.isDropDownBoxOpened = false; 
    setTimeout(function() {  
        e.component.focus();  
    });  
    this.isDropDownBoxOpened = true;
  } 

  toggleList(){
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }

  roleSelected(e) {

  }

  levelSelected(e) {
    
  }
  
  emailtoggle() {

  }

  sharedtoggle() {

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