import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-journal-entry-profiles',
  templateUrl: './journal-entry-profiles.component.html',
  styleUrls: ['./journal-entry-profiles.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class JournalEntryProfilesComponent implements OnInit {
  hasModuleRights = true;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.baseService.HasUserModuleRight().subscribe((response) => {
      this.hasModuleRights = response;
    });
  }
}
