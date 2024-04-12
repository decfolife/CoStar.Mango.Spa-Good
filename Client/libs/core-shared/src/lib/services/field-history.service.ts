import { Injectable } from "@angular/core";
import { HistoryEntry } from "@mango/data-models/lib-data-models";
import { Observable, of } from "rxjs";

@Injectable()
export class FieldHistoryService {

  getFieldHistory(portfolioId: number, OTID: number): Observable<HistoryEntry[]> {
    return of([])
  }
}