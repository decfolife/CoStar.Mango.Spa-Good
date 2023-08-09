import { Component, OnInit } from '@angular/core';
import { Service, Comment } from '../../app.service';

@Component({
  selector: 'app-object-comments',
  templateUrl: './object-comments.component.html',
  styleUrls: ['./object-comments.component.scss'],
  providers : [Service]
})
export class ObjectCommentsComponent implements OnInit {

	comments : Comment[];
	searchText : string;
	sortOrders : String[] = ["ASC", "DESC"];

	constructor(service : Service) {
		this.comments = service.getComments();
	}

	ngOnInit() {
	}

}
