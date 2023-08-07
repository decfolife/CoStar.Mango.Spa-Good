import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../app.service';

export class SFPerSeat {
    year: string;
    sfPerSeat: number;

    constructor(year,sfPerSeat) {
		this.year = year;
		this.sfPerSeat = sfPerSeat;	
	}
}

@Component({
	selector: 'sf-per-seat-card',
	templateUrl: './sf-per-seat-card.component.html',
	styleUrls: ['./sf-per-seat-card.component.scss'],
	providers: [ Service ]
})
export class SfPerSeatCardComponent implements OnInit {

	sfPerSeat : SFPerSeat[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.sfPerSeat = [
			new SFPerSeat("2015", 295),
			new SFPerSeat("2016", 291),
			new SFPerSeat("2017", 288),
			new SFPerSeat("2018", 279),
			new SFPerSeat("2019", 276),
			new SFPerSeat("2020", 273),
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
