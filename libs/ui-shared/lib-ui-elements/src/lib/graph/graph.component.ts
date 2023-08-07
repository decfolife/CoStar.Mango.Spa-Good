import { Component, Input, OnInit } from '@angular/core';
export interface Year {
  Months: {
    month: string;
    logins: {
      totalLogins: number;
      distinctContactLogins: number;
    };
  };
}
@Component({
  selector: 'crem-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() id?: string;
  @Input() dataSource?: any;
  dataSource2: any;
  @Input() xAxis?: any[];
  @Input() yAxis?: any[];
  @Input() color?: string;
  @Input() type?: 'bar' | 'stackedBar';
  @Input() keyName?: string;
  @Input() width?: string = '100%';
  constructor() {
    this.dataSource2 = [
      {
        month: 'May 2020',

        totalLogins: 978,
        distinctContactLogins: 73,
      },
      {
        month: 'June 2020',

        totalLogins: 1189,
        distinctContactLogins: 77,
      },
      {
        month: 'July 2020',

        totalLogins: 1051,
        distinctContactLogins: 77,
      },
      {
        month: 'August 2020',

        totalLogins: 1211,
        distinctContactLogins: 78,
      },
      {
        month: 'Sept 2020',

        totalLogins: 1014,
        distinctContactLogins: 81,
      },
      { months: 'October 2020', totalLogins: 946, distinctContactLogins: 73 },
      { months: 'Nov 2020', totalLogins: 1011, distinctContactLogins: 80 },
      { months: 'Dec 2020', totalLogins: 853, distinctContactLogins: 75 },
      { month: 'January 2021', totalLogins: 962, distinctContactLogins: 79 },
      { month: 'February 2021', totalLogins: 1104, distinctContactLogins: 98 },
      { month: 'March 2021', totalLogins: 1171, distinctContactLogins: 87 },
      { month: 'April 2021', totalLogins: 929, distinctContactLogins: 75 },
    ];
  }

  ngOnInit(): void {}
}
