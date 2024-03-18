import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ProjectTeamMember } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit{
	@Input() projectMember: ProjectTeamMember;
	projectMemberData: ProjectTeamMember[] = [];

	public dataRetrieved: boolean = false;

	constructor() {}	

	ngOnInit() {
			this.projectMemberData.push(this.projectMember);
	}

}
