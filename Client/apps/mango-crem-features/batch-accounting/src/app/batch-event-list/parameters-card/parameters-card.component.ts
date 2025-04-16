import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { DxFormComponent } from 'devextreme-angular';

import {
  MeasureEvent,
  ParametersData,
  ScheduleObject,
  WorkflowStatus,
} from '../../shared/models';

type VisibleExtended<T> = T & { visible: boolean };

enum RemeasureTypes {
  'Initial' = 0,
  'Renewal' = 1,
  'Data Correction' = 2,
  'Rent Review (IFRS)' = 3,
  'CPI Cumulative Cap Reached' = 4,
  'Other' = 5,
  'Impairment' = 6,
  'Partial Termination' = 7,
  'Termination' = 8,
  'Full Termination' = 9,
}

@Component({
  selector: 'mango-parameters-card',
  templateUrl: './parameters-card.component.html',
  styleUrls: ['./parameters-card.component.scss'],
})
export class ParametersCardComponent implements OnInit {
  measureEvents: VisibleExtended<MeasureEvent>[];
  nextWorkflowStatuses: WorkflowStatus[];

  get isValid() {
    if (!this.form) return true;

    return this.form.instance.validate().isValid ?? false;
  }

  @Input()
  isReadOnly = false;

  @Input()
  scheduleObject: ScheduleObject;

  @Input()
  parametersData: ParametersData;

  @Output()
  selectedMeasureEventChange = new EventEmitter<MeasureEvent>();

  @ViewChild('ParametersForm', { static: false })
  form: DxFormComponent;

  ngOnInit() {
    this.filterMeasureEventDropdown();
    this.filterNextWorkflowStatusDropdown();
  }

  measureEventChanged = (evt) => {
    this.selectedMeasureEventChange.emit(evt.value);
  };

  private filterNextWorkflowStatusDropdown(): void {
    const statuses = this.parametersData.workflowStatuses
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.filter(
        (ws) => (ws as any).userHasRights || (ws as any).allUsersHaveRights
      )
      .sort((a, b) => a.statusOrder - b.statusOrder);

    // Now they're sorted, normalize the status order for future use
    statuses?.forEach((workflow, index) => (workflow.statusOrder = index));

    if (!this.parametersData.workflowSettings?.isIncrementOneLevelEnforced) {
      this.nextWorkflowStatuses = statuses?.slice();
      return;
    }

    const index = this.scheduleObject?.SelectedWorkflowStatus.statusOrder;
    // The "+ 2" is because "slice()" is non-inclusive of the ending index
    const sliceEnd = index + 2;

    this.nextWorkflowStatuses =
      index < this.parametersData.workflowStatuses.length - 1
        ? this.parametersData.workflowStatuses.slice(0, sliceEnd)
        : this.parametersData.workflowStatuses.slice();
  }

  private filterMeasureEventDropdown(): void {
    if (!this.parametersData?.measureEvents) {
      return;
    }

    const classIds = this.scheduleObject?.ClassificationTypes?.map(
      (x) => x.classificationID
    );

    this.measureEvents = this.parametersData.measureEvents.map(
      (measureEvent) => {
        // The 'visible' property is used internally by DevExtreme
        return Object.assign({ visible: true }, measureEvent);
      }
    );

    const exclusionsOp840Cap840OpLessor = [
      RemeasureTypes['Rent Review (IFRS)'],
      RemeasureTypes['CPI Cumulative Cap Reached'],
      RemeasureTypes.Impairment,
      RemeasureTypes['Partial Termination'],
      RemeasureTypes['Full Termination'],
    ];

    classIds.forEach((id) => {
      if ([0, 1, 5].includes(id)) {
        // Operating840, Capital840, OperatingLessor
        this.measureEvents.map((x) => {
          if (exclusionsOp840Cap840OpLessor.includes(x.remeasureTypeId)) {
            x.visible = false;
          }
        });
      }

      if ([2, 3].includes(id)) {
        // Finance842, Operating842
        this.measureEvents.map((x) => {
          if (
            [RemeasureTypes['Rent Review (IFRS)']].includes(x.remeasureTypeId)
          ) {
            x.visible = false;
          }
        });
      }

      // NOTE: IFRS (4) has no remeasure type exclusions
    });

    if (this.parametersData.cardMeasureEvent) {
      const eventId = this.parametersData.cardMeasureEvent.remeasureTypeId;

      this.parametersData.cardMeasureEvent = this.measureEvents.find(
        (x) => x.remeasureTypeId === eventId
      );
    }
  }

  itemTemplate(data: any) {
    let uniqueId: string;
    switch (true) {
      case !!data.workflowStatus:
        uniqueId = `work-flow-status-${data.workflowStatus
          .replace(/\s+/g, '-')
          .toLowerCase()}`;
        return `<div id="${uniqueId}">${data.workflowStatus}</div>`;

      case !!data.remeasureTypeName:
        uniqueId = `measure-event-${data.remeasureTypeName
          .replace(/\s+/g, '-')
          .toLowerCase()}`;
        return `<div id="${uniqueId}">${data.remeasureTypeName}</div>`;
    }
  }
}
