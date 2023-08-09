import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service, DropdownField, DashboardHero, DashboardCard } from '../../../../../app.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'strategy-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	providers: [Service]
})

export class StrategyDashboardComponent implements OnInit {

	cards : DashboardCard[];
	filters : DropdownField[];
	heros : DashboardHero[];
	settingsModalVisible : Boolean = false;
	settingsTabs : Object[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {

		this.filters = [
		];

		this.heros = [
			new DashboardHero('Renewals', "10", "+4", null, "There are currently...", true),
			new DashboardHero('Operate', "5", null, "15 days", "There are currently...", true),
			new DashboardHero('Terminate', "3", null, "", "There are currently...", true),
			new DashboardHero('Survey', "8", null, "","There are currently...", true),
			new DashboardHero('No Strategy', "15", null, "","There are currently...", true),
			new DashboardHero('Budgeted Capital', "$12.7M", null, "USD","There are currently...", true),
		];

		this.cards = [
			new DashboardCard("StrategyGlobalCardComponent", 2, true, "Global Strategies"),
			new DashboardCard("StrategyUpcomingCardComponent", 2, true, "Upcoming Strategies"),
			new DashboardCard("StrategyMarketVarianceCardComponent", 2, true, "Market Variance"),
			new DashboardCard("StrategyOlderThanCardComponent", 2, true, "Strategies older than one year"),
		];

	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
	}

	launchSettingsModal() {
		this.settingsModalVisible = true;
	}

	settingsModalCancel() {
		this.settingsModalVisible = false;
	}

	handleToggleChange(e, elementType) {
		let element;
		if( elementType == "filters" ){
			element = this[elementType].find(itm => itm.placeholder == e.source.name);
		} else {
			element = this[elementType].find(itm => itm.title == e.source.name);
		}
		element.visible = e.checked;

	}

}
