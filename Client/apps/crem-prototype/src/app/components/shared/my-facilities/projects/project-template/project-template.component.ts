import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.scss']
})
export class ProjectTemplateComponent implements OnInit {

	constructor( private router: Router, private route: ActivatedRoute ) { 
	}

	ngOnInit() {
	}

  	close() {
		// window.history.back();
		this.router.navigate(['../../home/templates'], { relativeTo: this.route });
	}

}
