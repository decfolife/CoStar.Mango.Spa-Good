import { AfterViewInit, Directive, Input, OnInit } from "@angular/core";
import { FieldHistoryComponent } from "./field-history.component";
import { FieldHistoryInput as FieldHistoryHttpSource } from "@mango/data-models/lib-data-models";


@Directive({
  standalone: true,
  selector: 'crem-field-history[history-http-source]'
})
export class FieldHistoryDirective implements OnInit, AfterViewInit{
  @Input('history-http-source') fieldHistoryParams: FieldHistoryHttpSource

  constructor(private fieldHistoryComponent: FieldHistoryComponent) {

  }

  ngOnInit(): void {
    this.fieldHistoryComponent.onDisplay.subscribe(_ => {
      console.log('on display triggered')
    })
    console.log(this.fieldHistoryParams)
  }

  ngAfterViewInit(): void {
      console.log(this.fieldHistoryComponent)

  }
}