import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  projectId: number;

  
  constructor (private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.queryParams.pipe(
      filter(params => !!params && !!params.oid),
      tap(params => {this.projectId = parseInt(params.oid)}),
    ).subscribe());

  }

 
	ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe);
  }

  
}
