import { SaveTaskTemplatePayload } from './../../../models/interfaces/save-tasks-template.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { InputComponent } from '@mango/ui-shared/lib-ui-elements';
import { Subscription } from 'rxjs';
import { SaveTasksTemplateService } from '@project-dashboard/services/save-tasks-template.service';

@Component({
  selector: 'crem-save-tasks-template',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './save-tasks-template.component.html',
  styleUrls: ['./save-tasks-template.component.scss'],
})
export class CremSaveTasksTemplateComponent implements OnInit, OnDestroy {
  @Input() projectId: number;

  @Output() saveComplete = new EventEmitter<boolean>();
  @Output() inputValueChange = new EventEmitter<string>();

  loader$ = new BehaviorSubject(false);

  value: string;
  taskTemplateSaved = false;
  subs: Subscription[] = [];

  constructor(private saveTasksTemplateService: SaveTasksTemplateService) {}

  ngOnInit(): void {
    this.saveTasksTemplateSaveListener();
  }

  valueChange() {
    this.inputValueChange.emit(this.value);
  }

  saveTasksTemplateSaveListener(): void {
    this.subs.push(
      this.saveTasksTemplateService.saveTasksTemplateSaveClick$.subscribe(
        (saveClicked) => {
          if (saveClicked) {
            this.saveTasksTemplate();
          }
        }
      )
    );
  }

  saveTasksTemplate() {
    this.loader$.next(true);

    const payload: SaveTaskTemplatePayload = {
      templateName: this.value,
      projectID: this.projectId,
    };

    this.subs.push(
      this.saveTasksTemplateService.saveTasksTemplate(payload).subscribe(
        (res) => {
          if (res) {
            this.subs.forEach((sub) => sub.unsubscribe());
            this.saveComplete.emit(true);
            this.saveTasksTemplateService.saveTasksTemplateSaveClick$.next(
              false
            );
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

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
