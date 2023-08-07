import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { DxGanttComponent } from 'devextreme-angular';
import { exportGantt } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import { ProjectGanttChartService } from './project-gantt-chart.service';
import { Task } from './project-gantt-chart.model'
import { ResolvedData } from '../../shared/models';

@Component({
  selector: 'mango-project-gantt-chart',
  templateUrl: './project-gantt-chart.component.html',
  styleUrls: ['./project-gantt-chart.component.scss']
})
export class ProjectGanttChartComponent implements OnInit {
  projectResolved: ResolvedData = this.route.snapshot.data['project'];
  pageTitle = this.projectResolved?.data?.name || this.route.snapshot.data['pageTitle'];
  projectId: number = +this.route.snapshot.paramMap.get('projectId') || undefined;
  userPreferencesResolved: ResolvedData = this.route.snapshot.data['userPreferences'];
  objectTypeID: number;
  objectType: string;

  ganttChartData: Task[];
  dateFormat: string;

  @ViewChild('GanttChart') ganttChart: DxGanttComponent;
  constructor(public service: ProjectGanttChartService,
    private datepipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userPreferences = this.userPreferencesResolved.data || {};

    this.objectTypeID = +this.route.snapshot.queryParamMap.get('OTID');
    this.dateFormat = userPreferences?.dateFormat || 'MM/dd/yyyy';

    this.service.getObjectNameAndType(this.projectId, this.objectTypeID).subscribe(result => {
      this.objectType = result.data.objectType;
      this.pageTitle = result.data.objectName;
    });

    this.service.getGanttChartData(this.projectId).subscribe(result => {
      this.buildGanttTree(result.data);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onContentReady(e: any) {
    e.component._showDialog({});
    e.component._dialogInstance.infoMap.TaskEdit = undefined;

    setTimeout(() => {
      e.component._ganttView._collapseAll();
    }, 100);
  }

  GetTaskLabel(id: number, name: string): string {
    return id.toString().concat(' - ', name);
  }

  public exportToPDF() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icon: any = document.getElementsByClassName('dx-icon dx-gantt-i dx-gantt-i-expand');

    if (icon && icon[0]) {
      icon[0].click();
    }

    // need the timeout because gantt hides tasks that are not expanded,
    // and will error out if try to export all with hidden tasks
    setTimeout(() => {
      let minDate = new Date();
      let maxDate = new Date();

      if (this.ganttChartData.length) {
        minDate = this.ganttChartData[0].targetStartDate;
        maxDate = this.ganttChartData[0].targetCompleteDate

        this.ganttChartData.forEach((data) => {
          if (data.targetStartDate < minDate) {
            minDate = data.targetStartDate
          }

          if (data.targetCompleteDate > maxDate) {
            maxDate = data.targetCompleteDate
          }
        });
      }

      const dateRange = {
        startDate: minDate,
        endDate: maxDate,
      }

      const currentDate = this.getCurrentDate();

      exportGantt({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createDocumentMethod: (args?: any) => new jsPDF(args),
        format: 'A4',
        landscape: true,
        exportMode: 'all',
        dateRange: dateRange,
        margins: {
          top: 40,
          left: 10,
          bottom: 10,
          right: 10
        }
      }).then(doc => {
        doc.setTextColor(0, 0, 0);
        doc.setPage(1);
        doc.text(this.pageTitle, 10, 22);
        doc.save(this.pageTitle + ' - ' + currentDate + '.pdf');
      });
    }, 500);
  }

  private buildGanttTree(data) {
    this.ganttChartData = data.map((item) => {
      const lastIndex = item.step.lastIndexOf('.');

      if (lastIndex !== -1) {
        const parentStep = item.step.slice(0, lastIndex);
        const parentItem = data.find((parentItem) => {
          return parentItem.step === parentStep
        });

        item.parentId = parentItem.taskId;
      }

      return item;
    });
  }

  private getCurrentDate(): string {
    return this.datepipe.transform(new Date(), this.dateFormat);
  }
}
