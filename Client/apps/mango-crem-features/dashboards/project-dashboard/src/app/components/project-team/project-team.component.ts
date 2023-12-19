import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '@project-dashboard/services/dashboard.service';


@Component({
  selector: 'project-teams',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {


  
  constructor(private dashboardService: DashboardService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
    }
  );
  }

}