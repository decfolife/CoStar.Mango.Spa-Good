import { Directive, Input, OnDestroy, OnInit } from "@angular/core";
import { FieldHistoryComponent } from "./field-history.component";
import { FieldHistoryInput} from "@mango/data-models/lib-data-models";
import { FieldHistoryService } from "../../../../../core-shared/src/lib/services/field-history.service";
import { switchMap } from "rxjs/operators";
import { Subscription } from 'rxjs';


@Directive({
  standalone: true,
  selector: 'crem-field-history[history-http-source]',
  providers: [FieldHistoryService]
})
export class FieldHistoryDirective implements OnInit, OnDestroy{
  @Input('history-http-source') fieldHistoryParams: FieldHistoryInput
  private subscriptions = new Subscription()


  constructor(
    private fieldHistoryComponent: FieldHistoryComponent,
    private fieldHistoryService: FieldHistoryService,
    ) {

  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.fieldHistoryComponent.onDisplay.pipe(
        switchMap(_ => this.fieldHistoryService.getFieldHistory(this.fieldHistoryParams.portfolioId, this.fieldHistoryParams.helpTextName, this.fieldHistoryParams.fieldHistoryName, this.fieldHistoryParams.objectTypeId, this.fieldHistoryParams.objectId)
        ),
      ).subscribe((data: any) => {
        this.fieldHistoryComponent.dataSource = data.data;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}