import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Project, Task } from '../../app.service';

@Component({
  selector: 'project-popover',
  templateUrl: './project-popover.component.html',
  styleUrls: ['./project-popover.component.scss']
})
export class ProjectPopoverComponent implements OnInit {

  approvals : Task[];

  @Input() project : Project;

  constructor() { }

  ngOnInit() {
    this.approvals = [
      new Task(1, "Submit PIF", "5/14/2020", null, 1, null, null, null, null, null, false, false, false, "Jason Trkovsky", null, "3.0", 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),      
      new Task(1, "Conduct Site Analysis", "5/14/2020", null, 1, null, null, null, null, null, false, false, false, "Jason Trkovsky", null, "4.0", 0, null, null, null, null, null, null, 2, 3, null, null, null, null, null, null, null, null, null, null, [], null, null, null),      
    ];
  }

}
