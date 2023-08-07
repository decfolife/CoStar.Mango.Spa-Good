import {
  Component,
  ComponentRef,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Dropdown } from '@mango/data-models/lib-data-models';

import { Observable, Subscription } from 'rxjs';

import { CardHeaderDirective } from './cardHeader.directive';

const DRAG_INDICATOR = `<svg xmlns="http://www.w3.org/2000/svg" id="drag_indicator" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;

@Component({
  selector: 'crem-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],

  encapsulation: ViewEncapsulation.Emulated,
})
export class CardComponent {
  @Input() id: string | number;
  @Input() filterData?: Dropdown[];
  @Input() moreOptions?: any;
  @Input() customDropdownMenu?: boolean = false;
  @Input() showCustomHeader?: boolean;
  @Input() filterInitialValue?: Dropdown;
  @Input() showFilterClearButton?: boolean;
  @Input() searchlabel?=null;
  @Input() searchPlaceholder? = 'Search...';
  value: any = null;
  @Input() title: string;
  @Input() pendoTitleId: string;
  @Input() subtitle?: string;
  @Input() counter?: number;
  @Input() exportId?: string;
  @Input() dropDisplay?: string;
  @Input() dropValue?: string;
  @Input() dropdownPlaceholder: string;
  @ContentChild(CardHeaderDirective, { read: TemplateRef }) customHeader?: TemplateRef<any>;
  @ContentChild('customDropdownMenu', {static: false}) customDropdownMenuRef: TemplateRef<any>
  isExpanded: boolean = false;
  legendVisible : boolean = true;

  @Output() selectedFilter = new EventEmitter<any[]>();
  @Output() expandDataGrid = new EventEmitter<any>();
  @Output() exportGridId = new EventEmitter<any>();
  @Output() exportDataGrid = new EventEmitter<any>();
  @Output() hideLabels = new EventEmitter<any>();
  @Output() toggleLegendEvent = new EventEmitter<any>();

  constructor(
    iconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    public el: ElementRef
  ) {
    iconRegistry.addSvgIconLiteral(
      'drag_indicator',
      domSanitizer.bypassSecurityTrustHtml(DRAG_INDICATOR)
    );
  }

  selected(e:any) {
    this.selectedFilter.emit(e);
  }

  toggleExpanded () {
		this.isExpanded = !this.isExpanded;
    this.expandDataGrid.emit(this.isExpanded);
	}

	exportGridData() {
    this.exportDataGrid.emit(true);
    this.exportGridId?.emit(this.exportId)
	}

  hideGridLabels() {
    this.hideLabels.emit(true);
	}

  toggleLegend() {
		this.legendVisible = !this.legendVisible;
    this.toggleLegendEvent.emit(true);
	}

}