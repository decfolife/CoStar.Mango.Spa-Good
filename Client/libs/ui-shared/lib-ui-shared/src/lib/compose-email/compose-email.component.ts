/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailContact, EmailFileItem, EmailNoteType } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss']
})

export class ComposeEmailComponent implements OnInit {

  modalTitle: string = 'Compose Email';
  emailNote: string;
  dialogType: string;
  secondaryBtnText: string = 'Cancel';
  primaryBtnText: string = 'Send';
  public modalId: string = "composeEmailModalId";
  isDropDownBoxOpened = false;
  filteredMembers: string[] = [];
  contacts: EmailContact[] = [];
  fileItems: EmailFileItem[] = [];
  noteTypes: EmailNoteType[] = [];
  selectedNoteType: EmailNoteType;
  selectedToMembers: EmailContact[] =[];
  filePathsChecked: boolean = false;
  unapprovedTasksChecked: boolean = false;
  emailMessage: string = "";
  noteTypeValueInvalid: boolean = false;
  toMembersValueInvalid: boolean = false;

  fileIconList = [ // array of icon class list based on type
    { type: "pdf", icon: "faFilePdf" },
    { type: "csv", icon: "faFileCsv" },
    { type: "jpg", icon: "faFileImage" },
    { type: "png", icon: "faFile" },
    { type: "ppt", icon: "faFile" },
    { type: "xlsx", icon: "faFileExcel"},
    { type: "txt", icon: "faFile" }
  ];

  constructor(
    public dialogRef: MatDialogRef<ComposeEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.noteTypes = this.data.noteTypes;
    this.contacts = this.data.contacts;
    this.fileItems = this.data.fileItems;
    this.selectedNoteType = this.data.defaultNoteType;
    this.emailNote = this.data.emailNote? this.data.emailNote: "";
    if(this.fileItems.length) {
      this.fileItems.forEach(fileItem => {
        fileItem.extension =  fileItem.text ? fileItem.text.split('.').pop() : '';
        fileItem.icon = this.getIconName(fileItem.extension);
      })
    }
  }

  secondaryButtonClicked() {
    this.dialogRef.close(false);
  }

  primaryButtonClicked() {
    this.dialogRef.close(true);
  }

  focusOnDropDownInput(e) { 
    this.isDropDownBoxOpened = false; 
    setTimeout(function() {  
        e.component.focus();  
    });  
    this.isDropDownBoxOpened = true;
  } 

  noteTypeSelected(e) {
    this.selectedNoteType = e[0];
  }

  selectedMembers(e) {
    this.selectedToMembers = e;
  }

  getIconName(ext : string) : string { 
    let iconObj = this.fileIconList.find( obj => obj['type'] == ext.toLowerCase().trim());
    return iconObj ? iconObj['icon'] : "faFile";
  }

  public closeModal() {
    this.dialogRef.close();
  }

  sendEmail() {
    this.noteTypeValueInvalid = Object.keys(this.selectedNoteType).length ? false: true;
    this.toMembersValueInvalid = this.selectedToMembers.length ? false: true;

    if (this.noteTypeValueInvalid || this.toMembersValueInvalid) {
      return;
    }
  }

  toggleList() {
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }
  
}

