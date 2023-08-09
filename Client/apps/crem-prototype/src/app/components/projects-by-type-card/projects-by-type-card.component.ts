import { Component, OnInit, ViewChild } from '@angular/core';
import { DxChartComponent } from "devextreme-angular";

export class ProjectCount {
	projectType : String;
	projectCount : Number;

	constructor(projectType, projectCount) {
		this.projectType = projectType;
		this.projectCount = projectCount;
	}
}

@Component({
  selector: 'projects-by-type-card',
  templateUrl: './projects-by-type-card.component.html',
  styleUrls: ['./projects-by-type-card.component.scss']
})
export class ProjectsByTypeCardComponent implements OnInit {

	projectCounts : ProjectCount[];

	@ViewChild("ProjectsByTypeChart") chart: DxChartComponent;

	constructor() { }

	ngOnInit() {

		this.projectCounts = [
			new ProjectCount("Analysis", 5),
			new ProjectCount("Construction", 4),
			new ProjectCount("New Lease", 10),
			new ProjectCount("Reconfigure", 1),
			new ProjectCount("Relocation", 2),
			new ProjectCount("Renewal", 5),			
		];

	}

	standardTooltip(arg: any) {		

        var items = arg.valueText.split("\n"),
            color = arg.point.getColor();
            console.log(arg);
            console.log(items);
        items.forEach(function(item, index) {
            if(item.indexOf(arg.seriesName) === 0) {
                var element = document.createElement("span");

                element.textContent = arg.argumentText + " " + item;
                element.style.color = color;
                element.className = "active";

                items[index] = element.outerHTML;
            }
        });

        return { text: items.join("\n") };
    }

	exportChart ( exportFormat ) {
        this.chart.instance.exportTo('Projects By Type Chart', exportFormat);
    };

}
