import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../app.service';

export class RentPerSF {
    year: string;
    rentpsf: number;

    constructor(year,rentpsf) {
		this.year = year;
		this.rentpsf = rentpsf;	
	}
}

@Component({
	selector: 'rent-psf-card',
	templateUrl: './rent-psf-card.component.html',
	styleUrls: ['./rent-psf-card.component.scss'],
	providers: [ Service ]
})
export class RentPsfCardComponent implements OnInit {

	rentPsf : RentPerSF[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.rentPsf = [
			new RentPerSF("2015", 48.61),
			new RentPerSF("2016", 52.48),
			new RentPerSF("2017", 58.79),
			new RentPerSF("2018", 64.43),
			new RentPerSF("2019", 50.20),
			new RentPerSF("2020", 47.81),
		];
	}

	standardTooltip(arg: any) {		
        var items = arg.valueText.split("\n"),
            color = arg.point.getColor();
        items.forEach(function(item, index) {
            if(item.indexOf(arg.seriesName) === 0) {
                var element = document.createElement("span");

                element.textContent = item;
                element.style.color = color;
                element.className = "active";

                items[index] = element.outerHTML;
            }
        });

        return { text: items.join("\n") };
    }

    customizePoint(arg: any) {
        if(arg.argument == "2020") {
            return { color: "#225BAD", hoverStyle: { color: "#225BAD" } };
        } else {
        	return { color: "#F68338", hoverStyle: { color: "#F68338" } };
        }
    }

}
