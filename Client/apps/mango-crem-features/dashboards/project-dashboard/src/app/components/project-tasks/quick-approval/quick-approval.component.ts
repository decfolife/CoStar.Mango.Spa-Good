import { QUICK_APPROVAL_TASK_STATUS } from './../../../models/enums/quick-approval.enums';
import { adaptResponseToUI, buildQuickApprovalRequest } from './../../adapters/quick-approval-request.adapter';
import { QuickApprovalRequest, QuickApprovalUI } from './../../../models/interfaces/quick-approval.interface';
import { QuickApprovalService } from './../../../services/quick-approval.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {
  DatePickerModule,
  InputComponent,
  LoaderModule,
  SimpleGridModule,
} from '@mango/ui-shared/lib-ui-elements';
import {
  DxDataGridModule,
  DxTemplateModule,
  DxBulletModule,
  DxDateBoxModule,
  DxTextBoxModule,
  DxDataGridComponent,
  DxValidatorModule,
} from 'devextreme-angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'crem-quick-approval',
  standalone: true,
  imports: [
    CommonModule,
    LoaderModule,
    SimpleGridModule,
    DxDataGridModule,
    DxTemplateModule,
    DxDateBoxModule,
    DxBulletModule,
    DatePickerModule,
    InputComponent,
    DxTextBoxModule,
    DxValidatorModule,
  ],
  templateUrl: './quick-approval.component.html',
  styleUrls: ['./quick-approval.component.scss'],
})
export class CremQuickApprovalComponent implements OnInit {
  @Input() projectId: string;
  @Input() saveClicked: string;
  @Output() saveComplete = new EventEmitter<boolean>();
  @Output() pendingTaskApprovalCount = new EventEmitter<number>();
  loader$ = new BehaviorSubject(false);
  subs: Subscription[] = [];
  dataSource: QuickApprovalUI[] = [];
  dataLoaded = false;
  count = 0;
  selectedTasksToApprove = [];
  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;
  constructor(private quickApprovalService: QuickApprovalService) {}
  ngOnInit(): void {
    this.loader$.next(true);
    this.quickApprovalSaveListener();
    this.subs.push(
      this.quickApprovalService
        .getQuickApprovals(this.projectId)
        .subscribe((res) => {
          this.loader$.next(false);
          this.dataLoaded = true;
          this.dataSource = adaptResponseToUI(res.data.approvals);
        })
    );
  }
  quickApprovalSaveListener(): void {
    this.subs.push(
      this.quickApprovalService.quickApprovalSaveClick$.subscribe((saveClicked) => {
          if (saveClicked) {
            this.saveGridData();
          }
        }
      )
    );
  }
  onEditorPreparing(e): void {
    if (e.row && e.command == 'select') {
      let disable = e.row.data.approve === QUICK_APPROVAL_TASK_STATUS.APPROVED;
      e.editorOptions.disabled = disable;
    }
  }
  onSelectionChanged(event): void {
    this.selectedTasksToApprove = event.selectedRowsData;
    this.pendingTaskApprovalCount.emit(this.selectedTasksToApprove.length || 0);
  }
  saveGridData(): void {
    if (this.selectedTasksToApprove.length > 0) {
      this.loader$.next(true);
      const payload: QuickApprovalRequest = buildQuickApprovalRequest(this.selectedTasksToApprove);
      
      this.subs.push(
        this.quickApprovalService.saveQuickApprovals(payload).subscribe(
          (res) => {
            if (res) {
              this.subs.forEach((sub) => sub.unsubscribe());
              this.saveComplete.emit(true);
              this.quickApprovalService.quickApprovalSaveClick$.next(false);
              this.loader$.next(false);
            }
          },
          (err) => {
            this.loader$.next(false);
            // TODO: Show some kind of indicator that the request has failed.
          }
        )
      );
    }
  }
}