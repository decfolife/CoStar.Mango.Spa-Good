import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAIOutput } from '../models/ai-output.model';

interface SidebarState {
  isOpen: boolean;
  leaseId: number | null;
  aiOutput: IAIOutput | null;
}

@Injectable({ providedIn: 'root' })
export class AiSidebarService {
  private readonly stateSubject = new BehaviorSubject<SidebarState>({
    isOpen: false,
    leaseId: null,
    aiOutput: null,
  });
  readonly state$ = this.stateSubject.asObservable();
  readonly isOpen$ = this.state$.pipe(map((s) => s.isOpen));

  toggle(leaseId?: number): void {
    const { isOpen, leaseId: currentId, aiOutput } = this.stateSubject.value;
    this.stateSubject.next({
      isOpen: !isOpen,
      leaseId: leaseId !== undefined ? leaseId : currentId,
      aiOutput,
    });
  }

  open(leaseId?: number): void {
    const { leaseId: currentId, aiOutput } = this.stateSubject.value;
    this.stateSubject.next({
      isOpen: true,
      leaseId: leaseId !== undefined ? leaseId : currentId,
      aiOutput,
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
    this.stateSubject.next({ isOpen: false, leaseId: null, aiOutput: null });
  }

  get isOpen(): boolean {
    return this.stateSubject.value.isOpen;
  }
}
