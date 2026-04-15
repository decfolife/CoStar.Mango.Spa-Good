import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAIOutput } from '../models/ai-output.model';

interface SidebarState {
  isOpen: boolean;
  leaseId: number | null;
  aiOutput: IAIOutput | null;
  documentSearchQuery: string | null;
  documentRequestId: number;
}

@Injectable({ providedIn: 'root' })
export class AiSidebarService {
  private readonly stateSubject = new BehaviorSubject<SidebarState>({
    isOpen: false,
    leaseId: null,
    aiOutput: null,
    documentSearchQuery: null,
    documentRequestId: 0,
  });
  readonly state$ = this.stateSubject.asObservable();
  readonly isOpen$ = this.state$.pipe(map((s) => s.isOpen));

  toggle(leaseId?: number): void {
    const {
      isOpen,
      leaseId: currentId,
      aiOutput,
      documentSearchQuery,
      documentRequestId,
    } = this.stateSubject.value;
    this.stateSubject.next({
      isOpen: !isOpen,
      leaseId: leaseId !== undefined ? leaseId : currentId,
      aiOutput,
      documentSearchQuery,
      documentRequestId,
    });
  }

  open(leaseId?: number): void {
    const {
      leaseId: currentId,
      aiOutput,
      documentSearchQuery,
      documentRequestId,
    } = this.stateSubject.value;
    this.stateSubject.next({
      isOpen: true,
      leaseId: leaseId !== undefined ? leaseId : currentId,
      aiOutput,
      documentSearchQuery,
      documentRequestId,
    });
  }

  openDocumentSearch(leaseId: number, searchQuery: string): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      isOpen: true,
      leaseId,
      documentSearchQuery: searchQuery,
      documentRequestId: currentState.documentRequestId + 1,
    });
  }

  setAiOutput(leaseId: number, aiOutput: IAIOutput): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({
      ...currentState,
      leaseId,
      aiOutput,
    });
  }

  close(): void {
    this.stateSubject.next({
      isOpen: false,
      leaseId: null,
      aiOutput: null,
      documentSearchQuery: null,
      documentRequestId: 0,
    });
  }

  get isOpen(): boolean {
    return this.stateSubject.value.isOpen;
  }
}
