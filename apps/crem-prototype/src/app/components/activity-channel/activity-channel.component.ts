import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DxScrollViewComponent } from "devextreme-angular";
import { Service, TransactionActivity } from '../../app.service';

export class Mention {
    valueExpr: string;
    displayExpr: string;
	searchExpr : string;
	marker : string;
	dataSource : [];

    constructor(valueExpr,displayExpr,searchExpr,marker,dataSource) {
		this.valueExpr = valueExpr;
		this.displayExpr = displayExpr;
		this.searchExpr = searchExpr;
		this.marker = marker;	
		this.dataSource = dataSource;
	}
} 

@Component({
	selector: 'activity-channel',
	templateUrl: './activity-channel.component.html',
	styleUrls: ['./activity-channel.component.scss'],
	providers: [Service]
})
export class ActivityChannelComponent implements OnInit {

	@Input() activities : TransactionActivity[];
	@Input() mentions : Mention[];	
	@Input() projectId : number;
	@ViewChild("scrollView") activityScroll : DxScrollViewComponent;
	isReplying : boolean = false;
	replyToActivityId : number = null;
	newReply : string = null;
	isDraftingNewMessage : boolean = false;
	newMessage : string = null;
	scrollId : string;
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
		this.scrollId = "scroll_" + this.projectId;	
	}

	ngAfterViewInit() {
		
		this.doTheScrolling();
	}

	initiateReply(activity) {
		// console.log("you clicked reply for activity id: " + activity.id.toString());
		this.isReplying = true;
		this.replyToActivityId = activity.id;
	}

	saveReply(currentActivity) {
		// console.log(this.newReply);
		// Add the newReply to the activities array
		currentActivity.replies.push(new TransactionActivity(0, null, "Message", "Jason Trkovsky", "2021-11-19", "8:51 AM", this.newReply, currentActivity.id, []));

		this.cancelReply();	
	}

	cancelReply() {
		this.isReplying = false;
		this.replyToActivityId = null;
		this.newReply = null;
	}

	draftNewMessage() {
		this.isDraftingNewMessage = true;	
	}

	saveNew() {
		// console.log(this.newMessage);
		// Add the newReply to the activities array
		this.activities.push(new TransactionActivity(0, null, "Message", "Jason Trkovsky", "2021-11-20", "12:32 PM", this.newMessage, 0, []));
		this.cancelNew();	
	}

	cancelNew() {
		this.isDraftingNewMessage = false;
		this.newMessage = null;
	}

	doTheScrolling() {
		// console.log(document.getElementById(this.scrollId));
		// let scrollEl = document.getElementById(this.scrollId);
		// console.log(scrollEl.scrollHeight);
		// scrollEl.scrollTop = scrollEl.scrollHeight;
		// document.querySelector(this.scrollId).querySelector(".activity-feed-wrapper").scrollTop = 595;
		// setTimeout(() => {
		// 	let scrollHeight = this.activityScroll.instance.scrollHeight();
		// 	this.activityScroll.instance.scrollBy(scrollHeight);
		// }, 3000);
	}

}
