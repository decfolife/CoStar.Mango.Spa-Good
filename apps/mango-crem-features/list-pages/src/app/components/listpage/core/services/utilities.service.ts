import { Injectable } from '@angular/core';

import {
  addDays, addWeeks, addMonths, addYears,
  subDays, subWeeks, subMonths, subYears,
  getYear, getMonth, getDay
} from 'date-fns';
import { ColumnDefinition } from '../../shared/models';

@Injectable()
export class UtilitiesService {
  public static intervals = ['Days', 'Weeks', 'Months', 'Years']

  public static beforeAfter = ['Before', 'After'];

  public static selectDate = ['Today', 'Direct Entry', 'Date Field'];

  public static rangeDateFilterFields = 
  [{fieldName: "numOfIntervals", filterStringIndex: 0, defaultValue: 1}, {fieldName: "intervalType", filterStringIndex: 1, defaultValue: 'Days'},
   {fieldName: "beforeAfter", filterStringIndex: 2, defaultValue: 'Before'}, {fieldName: "selectDate", filterStringIndex: 3, defaultValue: 'Today'},
   {fieldName: "customDate", filterStringIndex: null, defaultValue: null}, {fieldName: "dateColumn", filterStringIndex: null, defaultValue: null}];

  public static gridColumns: ColumnDefinition[] = [];
  public static filterFieldsForRangeDate: any[] = []; 
 
  public static baseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }

  public static getCustomFilterOperation(): any {
    return [
      {
        name: 'rangeBefAftDate',
        caption: 'Range Before/After Date',
        dataTypes: ['date'],
        icon: 'check',
        editorTemplate: 'rangeDateTemplate',
        hasValue: true,
        
        calculateFilterExpression(filterValue: any, field: any) {
          let filterObject = UtilitiesService.parseRangeFilterDateStr(filterValue).rangeDateFilterObj;

          return [
            [
              (rowData: any) => rowData[field.dataField] !== null,
            ],
            'and',
            [
              (rowData: any) => UtilitiesService.compareDates(filterObject, rowData, field),
              '=',
              true
            ],
          ];
        }  
      },

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
              getYear(subDays(new Date(), 1))
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(subDays(new Date(), 1))
            ],

            'and',
            [
              (rowData: any) => getDay(new Date(rowData[field.dataField])),
              '=',
              getDay(subDays(new Date(), 1))
            ]
          ];
        }
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
              getYear(new Date())
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(new Date())
            ],

            'and',
            [
              (rowData: any) => getDay(new Date(rowData[field.dataField])),
              '=',
              getDay(new Date())
            ]
          ];
        }
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
              getYear(addDays(new Date(), 1))
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(addDays(new Date(), 1))
            ],

            'and',
            [
              (rowData: any) => getDay(new Date(rowData[field.dataField])),
              '=',
              getDay(addDays(new Date(), 1))
            ]
          ];
        }
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
              getYear(subMonths(new Date(), 1))
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(subMonths(new Date(), 1))
            ]
          ];
        }
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
              getYear(new Date())
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(new Date())
            ]
          ];
        }
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
              getYear(addMonths(new Date(), 1))
            ],

            'and',
            [
              (rowData: any) => getMonth(new Date(rowData[field.dataField])),
              '=',
              getMonth(addMonths(new Date(), 1))
            ]
          ];
        }
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
            getYear(subYears(new Date(), 1))
          ]];
        }
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
            getYear(new Date())
          ]];
        }
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
            getYear(addYears(new Date(), 1))
          ]];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addMonths(new Date(), 3)
            ]
          ];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addMonths(new Date(), 6)
            ]
          ];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addMonths(new Date(), 9)
            ]
          ];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subMonths(new Date(), 3)
            ]
          ];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subMonths(new Date(), 6)
            ]
          ];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subMonths(new Date(), 9)
            ]
          ];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '<=',
              addYears(new Date(), 1)
            ]
          ];
        }
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
              new Date()
            ],

            'and',
            [
              (rowData: any) => new Date(rowData[field.dataField]),
              '>=',
              subYears(new Date(), 1)
            ]
          ];
        }
      }

    ];
  }

  public static parseRangeFilterDateStr(rangeFilterText): any{
    let rangeDateFilterObj: any = {};
    let customDateSelected: boolean = false;
    let dateColumnSelected: boolean = false;
  
    if(rangeFilterText === null){
      return {rangeDateFilterObj, customDateSelected, dateColumnSelected};
    }

    let index = 0;
    let partsSplitByComma = rangeFilterText.split(" ");

    this.rangeDateFilterFields.filter(rdff => rdff.filterStringIndex !== null).forEach(ff => {
      let displayValue = null;
      let filterTextPart = partsSplitByComma[index].trim();
      switch(ff.fieldName) { 
        case 'numOfIntervals': { 
          displayValue = Number(filterTextPart);
          break; 
        } 
        case 'intervalType': { 
          displayValue = this.intervals.find(inter => inter.toLocaleLowerCase().startsWith(filterTextPart)); 
          break; 
        } 
         case 'beforeAfter': { 
          displayValue = this.beforeAfter.find(ba => ba.toLocaleLowerCase().startsWith(filterTextPart)); 
          break; 
        } 
        case 'selectDate': { 
          displayValue = filterTextPart; 
          if(displayValue !== 'Today'){
            //Handles if there is a custom date
            let slashDateParts = displayValue.split('/');
            let periodDateParts = displayValue.split('.');
            let isDate = (slashDateParts.length === 3 && slashDateParts.findIndex(sdp => isNaN(sdp)) < 0) || 
                          (periodDateParts.length === 3 && periodDateParts.findIndex(pdp => isNaN(pdp)) < 0);

            if(isDate) {
              if(periodDateParts.length === 3){
                //Is euro date
                displayValue = periodDateParts[1] + '/' + periodDateParts[0] + '/' + periodDateParts[2];
              }

              rangeDateFilterObj['customDate'] = new Date(displayValue);
              displayValue = 'Direct Entry';
              customDateSelected = true;
              }
            else{
              //Using a date column
              //Concat all the string values left into one string and set the date column field
              displayValue = partsSplitByComma.slice(index).join(' ');
              rangeDateFilterObj['dateColumn'] = displayValue;
              displayValue = 'Date Field'
              dateColumnSelected = true;
            }
          }
          break; 
        } 
        default: { 
           break; 
        } 
      }

      rangeDateFilterObj[ff.fieldName] = displayValue;
      ++index;
    })    

    return {rangeDateFilterObj, customDateSelected, dateColumnSelected};
  }

  private static compareDates(filterObject, rowData, field){
    let startDate: Date;
    let endDate: Date;
    let datagridFieldDate: Date;
    let originalDateFromFilter = new Date();
    let dateCalculatedFromFilter = new Date();

    if(filterObject.selectDate === 'Direct Entry'){
      originalDateFromFilter = filterObject.customDate;
      dateCalculatedFromFilter = filterObject.customDate;
    }
    else if(filterObject.selectDate === 'Date Field'){
      let foundColumn = this.gridColumns.find(dgc => dgc.caption === filterObject.dateColumn);

      originalDateFromFilter = new Date(rowData[foundColumn.dataField])
      dateCalculatedFromFilter = new Date(rowData[foundColumn.dataField])
    }

    if(filterObject.beforeAfter === 'Before'){

      switch(filterObject.intervalType) { 
        case 'Days': { 
          dateCalculatedFromFilter = subDays(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
        case 'Weeks': { 
          dateCalculatedFromFilter = subWeeks(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
        case 'Months': { 
          dateCalculatedFromFilter = subMonths(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
        case 'Years': { 
          dateCalculatedFromFilter = subYears(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
      } 

      startDate = dateCalculatedFromFilter;
      endDate = originalDateFromFilter;
      datagridFieldDate = new Date(rowData[field.dataField])
    }
    else {
      switch(filterObject.intervalType) { 
        case 'Days': { 
          dateCalculatedFromFilter = addDays(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
        case 'Weeks': { 
          dateCalculatedFromFilter = addWeeks(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
        case 'Months': { 
          dateCalculatedFromFilter = addMonths(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
        case 'Years': { 
          dateCalculatedFromFilter = addYears(dateCalculatedFromFilter, filterObject.numOfIntervals)
          break; 
        } 
      }   

      startDate = originalDateFromFilter;
      endDate = dateCalculatedFromFilter;
      datagridFieldDate = new Date(rowData[field.dataField])
    }
    
    return datagridFieldDate >= startDate && datagridFieldDate <= endDate
  }
}
