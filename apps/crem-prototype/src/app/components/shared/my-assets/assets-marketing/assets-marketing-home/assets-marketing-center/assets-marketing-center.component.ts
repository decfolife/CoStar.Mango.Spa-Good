import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'assets-marketing-center',
  templateUrl: './assets-marketing-center.component.html',
  styleUrls: ['./assets-marketing-center.component.scss']
})
export class AssetsMarketingCenterComponent implements OnInit {

	constructor( private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
	}

	navigateToAsset() {
		this.router.navigate(['/costar-b/assets/marketing/asset']);
	}

}
