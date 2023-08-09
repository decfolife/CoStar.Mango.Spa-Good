import { Injectable } from '@angular/core';

import {
  addDays, addMonths, addYears,
  subDays, subMonths, subYears,
  getYear, getMonth, getDay,
} from 'date-fns';

@Injectable()
export class UtilitiesService {
  static baseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }

  static getCustomFilterOperation(): any {
    return [
      {
        name: 'yesterday',
        caption: 'Yesterday',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => getYear(new Date(rowData[field.dataField])),
              '=',
              getYear(subDays(new Date(), 1)),
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(subDays(new Date(), 1)),
            ],

            'and',
            [
              (rowData: any) => getDay(new Date(rowData[field.dataField])),
              '=',
              getDay(subDays(new Date(), 1)),
            ],
          ];
        },
      },

      {
        name: 'today',
        caption: 'Today',
        dataTypes: ['date'],

        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => getYear(new Date(rowData[field.dataField])),
              '=',
              getYear(new Date()),
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(new Date()),
            ],

            'and',
            [
              (rowData: any) => getDay(new Date(rowData[field.dataField])),
              '=',
              getDay(new Date()),
            ],
          ];
        },
      },

      {
        name: 'tomorrow',
        caption: 'Tomorrow',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => getYear(new Date(rowData[field.dataField])),
              '=',
              getYear(addDays(new Date(), 1)),
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(addDays(new Date(), 1)),
            ],

            'and',
            [
              (rowData: any) => getDay(new Date(rowData[field.dataField])),
              '=',
              getDay(addDays(new Date(), 1)),
            ],
          ];
        },
      },

      {
        name: 'lastMonth',
        caption: 'Last Month',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => getYear(new Date(rowData[field.dataField])),
              '=',
              getYear(subMonths(new Date(), 1)),
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(subMonths(new Date(), 1)),
            ],
          ];
        },
      },

      {
        name: 'thisMonth',
        caption: 'This Month',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => getYear(new Date(rowData[field.dataField])),
              '=',
              getYear(new Date()),
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(new Date()),
            ],
          ];
        },
      },

      {
        name: 'nextMonth',
        caption: 'Next Month',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => getYear(new Date(rowData[field.dataField])),
              '=',
              getYear(addMonths(new Date(), 1)),
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(addMonths(new Date(), 1)),
            ],
          ];
        },
      },

      {
        name: 'lastYear',
        caption: 'Last Year',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [[
            (rowData: any) => getYear(new Date(rowData[field.dataField])),
            '=',
            getYear(subYears(new Date(), 1)),
          ]];
        },
      },

      {
        name: 'thisYear',
        caption: 'This Year',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [[
            (rowData: any) => getYear(new Date(rowData[field.dataField])),
            '=',
            getYear(new Date()),
          ]];
        },
      },

      {
        name: 'nextYear',
        caption: 'Next Year',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [[
            (rowData: any) => getYear(new Date(rowData[field.dataField])),
            '=',
            getYear(addYears(new Date(), 1)),
          ]];
        },
      },

      {
        name: 'nextThreeMonths',
        caption: '3 Months From "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addMonths(new Date(), 3),
            ],
          ];
        },
      },

      {
        name: 'nextSixMonths',
        caption: '6 Months From "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addMonths(new Date(), 6),
            ],
          ];
        },
      },

      {
        name: 'nextNineMonths',
        caption: '9 Months From "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addMonths(new Date(), 9),
            ],
          ];
        },
      },

      {
        name: 'previousThreeMonths',
        caption: '3 Months Before "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subMonths(new Date(), 3),
            ],
          ];
        },
      },

      {
        name: 'previousSixMonths',
        caption: '6 Months Before "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subMonths(new Date(), 6),
            ],
          ];
        },
      },

      {
        name: 'previousNineMonths',
        caption: '9 Months Before "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subMonths(new Date(), 9),
            ],
          ];
        },
      },

      {
        name: 'nextOneYear',
        caption: '1 Year From "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addYears(new Date(), 1),
            ],
          ];
        },
      },

      {
        name: 'previousYear',
        caption: '1 Year Before "Today"',
        dataTypes: ['date'],
        icon: 'check',
        hasValue: false,

        calculateFilterExpression(_: any, field: any) {
          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              new Date(),
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subYears(new Date(), 1),
            ],
          ];
        },
      },
    ];
  }
}
