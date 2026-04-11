import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import {
  AiFormField,
  AiDropdownItem,
  AiFormSection,
  AiRentScheduleSection,
} from '../../models/ai-form.model';

@Component({
  selector: 'mango-ai-form-section',
  templateUrl: './ai-form-section.component.html',
  styleUrls: ['./ai-form-section.component.scss'],
})
export class AiFormSectionComponent implements OnInit {
  @Input() section: AiFormSection;
  @Input() formGroup: FormGroup;
  @Input() editMode = false;
  @Input() isExpanded = true;

  rentSchedule: AiRentScheduleSection | null = null;

  constructor(private readonly formWizardService: FormWizardService) {}

  readonly rentScheduleColumns = [
    { dataField: 'startMonth', caption: 'Start Mo.', width: 90 },
    { dataField: 'endMonth', caption: 'End Mo.', width: 90 },
    {
      dataField: 'startDate',
      caption: 'Start Date',
      dataType: 'date',
      format: 'MM/dd/yyyy',
      width: 120,
    },
    {
      dataField: 'endDate',
      caption: 'End Date',
      dataType: 'date',
      format: 'MM/dd/yyyy',
      width: 120,
    },
    {
      dataField: 'monthlyBaseRent',
      caption: 'Monthly Base Rent',
      dataType: 'number',
      format: { type: 'currency', precision: 0 },
      width: 160,
    },
  ];

  readonly abatementColumns = [
    { dataField: 'startMonth', caption: 'Start Mo.', width: 90 },
    { dataField: 'endMonth', caption: 'End Mo.', width: 90 },
    {
      dataField: 'startDate',
      caption: 'Start Date',
      dataType: 'date',
      format: 'MM/dd/yyyy',
      width: 120,
    },
    {
      dataField: 'endDate',
      caption: 'End Date',
      dataType: 'date',
      format: 'MM/dd/yyyy',
      width: 120,
    },
    {
      dataField: 'discountAmount',
      caption: 'Abatement Amount',
      dataType: 'number',
      format: { type: 'currency', precision: 0 },
      width: 160,
    },
    {
      dataField: 'discountPercent',
      caption: 'Discount %',
      dataType: 'number',
      format: { type: 'fixedPoint', precision: 1 },
      width: 110,
    },
  ];

  ngOnInit(): void {
    if (this.section?.rentSchedule) {
      this.rentSchedule = this.section.rentSchedule;
    }

    this.loadDropdownOptions();
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  getFieldControl(fieldKey: string): any {
    return this.formGroup?.get(fieldKey);
  }

  getColumnTemplate(): string {
    const columns = Math.max(1, Math.min(this.section?.columns ?? 1, 4));
    return `repeat(${columns}, minmax(0, 1fr))`;
  }

  formatDisplayValue(field: AiFormField): string {
    const val = field.value;
    if (val == null || val === '') return '—';

    switch (field.type) {
      case 'dropdown':
        return this.getDropdownDisplayValue(field, val);
      case 'boolean':
        return val === true || val === 'true' ? 'Yes' : 'No';
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(Number(val));
      case 'percent':
        return `${Number(val).toFixed(2)}%`;
      case 'number':
        return Number(val).toLocaleString();
      case 'date':
        return val ? new Date(val).toLocaleDateString('en-US') : '—';
      default:
        return String(val);
    }
  }

  getDropdownValueExpr(field: AiFormField): string {
    return field.valueExpr || 'id';
  }

  getDropdownDisplayExpr(field: AiFormField): string {
    return field.displayExpr || 'name';
  }

  onDropdownSelected(field: AiFormField, selectedItems: any[]): void {
    const selectedItem = selectedItems?.[0];
    const valueExpr = this.getDropdownValueExpr(field);
    const nextValue =
      selectedItem && valueExpr in selectedItem
        ? selectedItem[valueExpr]
        : null;

    this.getFieldControl(field.key)?.setValue(nextValue);
    field.value = nextValue;
  }

  hasAbatements(): boolean {
    return (this.rentSchedule?.abatementItems?.length ?? 0) > 0;
  }

  private loadDropdownOptions(): void {
    this.section?.fields
      ?.filter(
        (field) =>
          field.type === 'dropdown' &&
          !field.dropdownItems?.length &&
          !!field.requestTypeId
      )
      .forEach((field) => {
        this.formWizardService.getRenderSelect('', field.requestTypeId!).subscribe({
          next: (result: any) => {
            const items = this.normalizeDropdownItems(result?.data);
            if (items.length) {
              field.dropdownItems = items;
            }
          },
        });
      });
  }

  private normalizeDropdownItems(items: any): AiDropdownItem[] {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map((item) => ({
      id:
        item.id ??
        item.value ??
        item.lookupID ??
        item.formItemID ??
        item.objectTypeTypeID ??
        item.leaseTypeID,
      name:
        item.name ??
        item.text ??
        item.label ??
        item.value ??
        item.lookupName ??
        item.formItemLabel ??
        item.objectTypeTypeName ??
        item.leaseTypeName,
    }));
  }

  private getDropdownDisplayValue(field: AiFormField, value: any): string {
    const items = field.dropdownItems ?? [];
    const valueExpr = this.getDropdownValueExpr(field);
    const displayExpr = this.getDropdownDisplayExpr(field);
    const matchedItem = items.find((item: any) => item?.[valueExpr] === value);

    if (!matchedItem) {
      return String(value);
    }

    return String(matchedItem?.[displayExpr] ?? value);
  }
}
