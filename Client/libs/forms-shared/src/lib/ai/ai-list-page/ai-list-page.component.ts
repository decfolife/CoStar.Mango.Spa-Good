import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AiLeaseListItem } from '../models/ai-form.model';
import { AiLeaseService } from '../services/ai-lease.service';

@Component({
  selector: 'mango-ai-list-page',
  templateUrl: './ai-list-page.component.html',
  styleUrls: ['./ai-list-page.component.scss'],
})
export class AiListPageComponent implements OnInit, OnDestroy {
  leases: AiLeaseListItem[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  createdAiAbstractionId: number | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly stopPolling$ = new Subject<void>();

  constructor(
    private readonly aiLeaseService: AiLeaseService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          this.createdAiAbstractionId =
            Number(params.get('createdAiAbstractionId') ?? 0) || null;
          this.stopPolling$.next();
          this.loadLeases(true);
        },
      });
  }

  ngOnDestroy(): void {
    this.stopPolling$.next();
    this.stopPolling$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRowClick(event: { data: AiLeaseListItem }): void {
    if (event?.data?.id) {
      this.router.navigate([event.data.id], {
        relativeTo: this.activatedRoute,
        queryParams: this.activatedRoute.snapshot.queryParams['formId']
          ? { formId: this.activatedRoute.snapshot.queryParams['formId'] }
          : undefined,
      });
    }
  }

  isProcessing(status: string): boolean {
    return ['Pending', 'Processing'].includes(status);
  }

  isCreatedRow(row: AiLeaseListItem): boolean {
    return !!this.createdAiAbstractionId && row.id === this.createdAiAbstractionId;
  }

  private loadLeases(showLoading = false): void {
    if (showLoading) {
      this.isLoading = true;
    }
    this.errorMessage = null;

    this.aiLeaseService
      .getLeaseList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (leases) => {
          this.leases = leases;
          this.isLoading = false;

          if (leases.some((lease) => this.isProcessing(lease.status))) {
            this.startPolling();
          }
        },
        error: () => {
          this.errorMessage =
            'Failed to load AI lease abstractions. Please try again.';
          this.isLoading = false;
        },
      });
  }

  private startPolling(): void {
    this.stopPolling$.next();
    timer(5000, 5000)
      .pipe(
        switchMap(() => this.aiLeaseService.getLeaseList()),
        takeUntil(this.stopPolling$),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (leases) => {
          this.leases = leases;
          if (!leases.some((lease) => this.isProcessing(lease.status))) {
            this.stopPolling$.next();
          }
        },
        error: () => {
          this.stopPolling$.next();
        },
      });
  }
}
