import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  NgForm,
} from '@angular/forms';
import { Dropdown } from '@mango/data-models/lib-data-models';
import { DxDataGridComponent, DxDropDownBoxComponent, DxFormComponent, DxSelectBoxComponent, DxValidatorComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

//  export const dropdownData = (data: any[]) =>{
//    const values: any[] = []
//  return data.map((datum : Dropdown)=> {
//    values.push(datum.displayKey)
//    return data=values;
//  })
//  }

@Component({
  selector: 'crem-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnChanges {
  public data: any[];
  public value: string[];
  public selections: {}[] = [];
  public selectedObjects: {}[] = [];
  public wrapperAttr: any;
  public selectBoxWrapperAttr: any;
  public selectedDisplay: any[] = [];
  public isDropDownBoxOpened: boolean = false;
  public modalValueChanging: boolean = false;
  public loading: boolean = true;
  @Output() selectedItems = new EventEmitter<any[]>();
  @ViewChild('dropdownTemplate', { static: false })
  dropdownTemplate: DxDataGridComponent;
  @ViewChild(DxSelectBoxComponent) selectBox: DxSelectBoxComponent
  @ViewChild(DxDropDownBoxComponent) dropDown: DxDropDownBoxComponent
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  @ViewChild("SelectBoxValidator", { static: false }) SelectBoxValidator: DxValidatorComponent


  @Input() public id: string;
  @Input() public initialSelectedValue: any;
  @Input() public placeholder: string = 'Select...';
  @Input() public label?: string;
  public valueKey: string;
  @Input() public useSelectBox?: boolean = false;
  @Input() public selectBoxValue?: any;
  @Input() public valueExpr?: string = 'valueKey';
  @Input() keyExpr?: string = null;
  @Input() public displayExpr?: string = "displayKey";
  @Input() public isSearchable?: boolean;
  @Input() public contentTemplate?: any;
  @Input() public hoverText?: string;
  @Input() public columnHeader?: boolean;
  @Input() public showHeader?: boolean = false;
  @Input() public showClearButton?: boolean = true;
  @Input() public selectMode?: 'single' | 'multiple' = 'single';
  @Input() public dropdownHeaderDisplay: string;
  @Input() public showColumnHeader?: boolean = false;
  @Input() public required?: boolean = false;
  @Input() public isVisible?: boolean = true;
  @Input() public dataField?: string;
  @Input() public readOnly?: boolean = false;
  @Input() public showRedBorder?: boolean = false;
  @Input() public customRequireValidation?: boolean = false;
  @Input() public grouped?: boolean = false;
  @Input() public useArrayOfKeys?: boolean = false;
  @Input() public getWholeObject?: boolean = false;
  @Input() public useCustomGroupTemplate?: boolean = false;
  @Input() public showCheckBoxesMode?:
    | 'onClick'
    | 'onLongTap'
    | 'always'
    | 'none' = 'none';
  @Input() public dataSource: any[];
  @Input() public allowSearch?: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() dropDownContainerCustomClass: string;

  @ContentChild('customHeaderTemplate') customHeaderTemplate : TemplateRef<any>;
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const { previousValue, currentValue } = changes.dataSource || {}
    if (previousValue !== currentValue && currentValue && currentValue.length > 0) {
      this.initializeDropdown()
    }
  }

  initializeDropdown(): void {
    this.selectedDisplay = [];
    this.selections = [];

    if (this.selectMode == 'single') {
      this.dataSource.forEach((data) => {
        if (data?.[this.valueExpr] === this.initialSelectedValue) {
          this.selectedDisplay.push(data?.[this.valueExpr]);
          this.selections.push(data?.[this.keyExpr || this.valueExpr]);
        }
      });
    } else if (this.selectMode == 'multiple') {
      if (this.initialSelectedValue) {
        this.dataSource.forEach((data) => {
            if (this.initialSelectedValue.includes((data?.[this.valueExpr])?.toString())) {
              this.selectedDisplay.push(data?.[this.valueExpr]);
              if (!this.useArrayOfKeys) {
                this.selections.push(data);
              }
              if(this.getWholeObject) {
                this.selectedObjects.push(data);
              }
            }
        });
        if (this.useArrayOfKeys) {
          this.selections = this.initialSelectedValue;
        }
      }

      if(this.getWholeObject) {
        this.selectedItems.emit(this.selectedObjects);
      } else {
        this.selectedItems.emit(this.selections);
      }
    }
    this.setDropDownAttr(null);
  }

  ngOnInit() {
    this.dropdownHeaderDisplay = this.dropdownHeaderDisplay || this.placeholder;
    this.wrapperAttr = {
      class: this.dropDownContainerCustomClass,
      id: 'crem-select-box'
    }
    this.selectBoxWrapperAttr = {
      id: 'crem-select-box',
      class: this.dropDownContainerCustomClass ? 'crem-select-box' + ' ' + this.dropDownContainerCustomClass : 'crem-select-box'
    }

    if (
      this.initialSelectedValue === null ||
      this.initialSelectedValue === undefined ||
      this.dataSource === null ||
      this.dataSource === undefined
    ) {
      this.loading = false;
      
      return;
    }
    this.loading = false;
    // this.adaAttributes();
  }

  getEle() {
    var idEle = document.getElementById('dropdownContainer');
  }

  dropdownOnValueChanged($event) {
    //If the value is null that means that the dropdown has been cleared of the selected value.
    //We want to emit this back to let the parent component know that the dropdown was cleared.
    if ($event.value === null && !this.useSelectBox) {
      this.dataGrid.instance ? this.dataGrid.instance.clearSelection() : null
      this.selectedItems.emit([]);
    } else if (this.useSelectBox) {
      let index = -1;
      let itemIndex = -1;
      let groupIndex = -1;
      if (this.grouped) {
        this.dataSource?.forEach((group, gIndex) => {
          const tempItemIndex = group.items?.findIndex((data) => {
            return data?.[this.valueExpr] === $event?.value 
          })

          if (tempItemIndex !== -1) {
            groupIndex = gIndex;
            itemIndex = tempItemIndex;
          }
        });
      } else {
        index = this.dataSource?.findIndex((data) => {
          return data?.[this.valueExpr] === $event?.value
        })
      }
      
      if (!this.grouped && index !== -1) {
        this.modalValueChanging = true;
        this.selectedItems.emit([this.dataSource[index]]);
        setTimeout(() => {
          this.selectBox.instance.close();
        })
        setTimeout(() => {
          this.modalValueChanging = false;
        }, 400)
      } else if (this.grouped && itemIndex !== -1) {
        this.modalValueChanging = true;
        this.selectedItems.emit([this.dataSource[groupIndex].items[itemIndex]]);
        setTimeout(() => {
          this.selectBox.instance.close();
        })
        setTimeout(() => {
          this.modalValueChanging = false;
        }, 400)
      } else {
        this.clearSelectBox();
        this.selectedItems.emit([]);
      }    
    }

  }

  getSelectedRowsData($event) {
    setTimeout(() => {
      let selections = $event.selectedRowsData;
      if (!selections) {
        return;
      } else {
        this.selectedDisplay = selections.map((data) => data?.[this.valueExpr]);
        if (this.selectMode == "single" && this.selectedDisplay.length) {
          this.isDropDownBoxOpened = false;
        }
      }
      this.selectedItems.emit(selections);
    })
  }

  clearSelectBox() {
    this.selectedDisplay = [];
    this.selectBox?.instance ? this.selectBox.instance.reset() : null
  }

  clearDropdown() {
    this.selectedDisplay = [];
    this.dataGrid.instance ? this.dataGrid.instance.clearSelection() : null
  }

  setDropdownvalue(data) {
    this.selectedDisplay = data.map((dropdown) => dropdown?.[this.valueExpr]);
    this.selections = data;
  }
  onDropdownClose(e) {
    if (!this.useSelectBox) {
      setTimeout(() => {
        this.dropDown.instance.focus();
      });
    }
  }

  focusDropdown() {
    if (!this.useSelectBox) {
      this.dropDown.instance.focus();
    } else {
      this.selectBox.instance.focus();
    }
  }

  isDropdownOpen() {
    if (this.useSelectBox) {
      return this.selectBox.instance.option().opened;
    }
  }

  openDropdown(e) {
    this.setDropDownAttr(e);
    this.setDropDownHeaderAttr(e);
  }  

  setDropDownAttr(e) {
    // Add title attribute to all dropdown options
    if (!this.useSelectBox) {
      const dropdownElement = document.getElementsByClassName("dx-row dx-data-row");
      setTimeout(() => {
        const arr = Array.from(dropdownElement);
        if (arr?.length) {
          arr.forEach((el) => {
            const childElment = Array.from(el.children);
            if (childElment.length) {
              childElment.forEach((childEl) => {
                if (childEl.innerHTML.length > 0) {
                  if (childEl?.classList?.contains("dx-command-select")) {
                    if (childElment?.[1]) {
                      const dropdownText = childElment?.[1]?.innerHTML;
                      const elements = Array.from(childElment[0].children);
                      const checkboxElement = elements[0];
                      const inputTag = checkboxElement.querySelector("input")
                      checkboxElement.setAttribute("title", 'Checkbox for ' + dropdownText);
                      checkboxElement.setAttribute("type", 'checkbox');
                      checkboxElement.setAttribute("role", 'group');
                      checkboxElement.setAttribute("aria-label", 'checkBox');
                      checkboxElement.removeAttribute("aria-readonly");
                      checkboxElement.removeAttribute("aria-checked");
                    }
                  } else {
                    childEl.setAttribute("title", childEl.innerHTML);
                  }
                }
              });
            }
          });
        }
      }, 100)

      const searchIconElement = document.getElementsByClassName("dx-item dx-menu-item dx-menu-item-has-icon dx-menu-item-has-submenu");
      setTimeout(() => {
        const iconArr = Array.from(searchIconElement);
        if (iconArr?.length) {
          iconArr.forEach((iconEl) => {
            iconEl.setAttribute("title", 'search');
          })
        }
      });

      if (this.showCheckBoxesMode === 'always' && this.selectMode === 'multiple') {
        const collection = document.getElementsByClassName("dx-datagrid-filter-row");
        setTimeout(() => {
          const arr = Array.from(collection);
          if (arr.length) {
            arr.forEach((el) => {
              const childElment = Array.from(el.children);
              if (childElment.length) {
                childElment.forEach((childEl) => {
                  if (childEl.className == "dx-editor-cell") {
                    childEl.setAttribute("colSpan", "2");
                  }
                });
              }
            });
          }
        }, 100)
      }
    } else {
      //add title to all selectbox options
      const selectBoxPopupElement = document.getElementsByClassName("crem-select-box");
      setTimeout(() => {
        const selectBoxPopupElementarr = Array.from(selectBoxPopupElement)
        if (selectBoxPopupElementarr.length) {
          selectBoxPopupElementarr.forEach((element) => {
            const selectBoxElement = element.getElementsByClassName("dx-list-item-content")
            setTimeout(() => {
              const arr = Array.from(selectBoxElement)
              if (arr.length) {
                arr.forEach((el) => {
                  if (el?.innerHTML?.length > 0) {
                    el.setAttribute("title", el.innerHTML)
                  }
                })
              }
            }, 100)
          })
        }
      }, 100)
    }
  }

  setDropDownHeaderAttr(e) {
    // Add aria-label attribute to header dropdown options
    if (!this.useSelectBox) {
      const dropdownElement = document.getElementsByClassName("dx-row dx-header-row");
      setTimeout(() => {
        const arr = Array.from(dropdownElement);
        if (arr?.length) {
          arr.forEach((el) => {
            const childElment = Array.from(el.children);
            if (childElment.length && childElment[0]?.classList?.contains("dx-command-select")) {
              if (childElment?.[1]) {
                const checkboxElement = childElment[0].children[0];
                const inputTag = checkboxElement.querySelector("input");
                checkboxElement.setAttribute("aria-label", 'Select All');
              }
            }
          });
        }
      }, 100);
    }
  }

  resetSelections() {
    if (this.dropDown) {
      this.dropDown.instance.reset()
    }
    if (this.dataGrid) {
      this.dataGrid.instance.clearFilter()
    }
  }

  validate() {
    if (this.useSelectBox) {
      const validation =  this.SelectBoxValidator.instance.validate();
      return validation;
    }
  }

	ADAatributes(e: any) {
		// Search for the span element with class dx-datagrid-nodata
    // TODO: If possible, change to avoid accessing the DOM directly
		const spanElement = e.component.$element().find('.dx-datagrid-nodata');
		if (spanElement.length > 0) {
		  spanElement.attr('role', 'alert');
		  spanElement.attr('aria-live', 'polite');
		}
  }

  onEnterKey() {
    setTimeout(() => {
      if (!this.modalValueChanging) {
        const isOpen = this.isDropdownOpen();
        if (!isOpen) {
          this.selectBox?.instance?.open();
        } else {
          this.selectBox?.instance?.close();
        }
      }
    })
  }

  closeSelectBox() {
    this.selectBox?.instance?.close();
  }

  onKeyDown(event) {
    if (this.selectMode !== 'single') {
      if (event?.event?.originalEvent?.key === " " || event?.event?.originalEvent?.key === "ArrowDown") {
        this.dropDown.instance.open();
      }
    }
  }

  onGridKeyDown(event) {
    if (event?.event?.originalEvent?.key === "Escape") {
      this.dropDown.instance.close();
    }
  }

}
@Directive({
  selector: 'dropdownButton',
})
export class DropDownButtonDirective { }

@Directive({
  selector: 'dropdownTemplate',
})
export class DropdownTemplateDirective { }

