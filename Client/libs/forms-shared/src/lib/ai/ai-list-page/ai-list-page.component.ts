import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ToastState } from '@mango/data-models/lib-data-models';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';
import { AiLeaseListItem } from '../models/ai-form.model';
import { AiLeaseService } from '../services/ai-lease.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { ExportDevexDatagridService } from '@mango/core-shared';
import { MatDialog } from '@angular/material/dialog';
import { AddAiLeaseModalComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/add-ai-lease-modal/add-ai-lease-modal.component';
import { AiMarkErrorDialogComponent } from './ai-mark-error-dialog.component';

@Component({
  selector: 'mango-ai-list-page',
  templateUrl: './ai-list-page.component.html',
  styleUrls: ['./ai-list-page.component.scss'],
})
export class AiListPageComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent)
  private grid?: DxDataGridComponent;

  leases: AiLeaseListItem[] = [];
  filteredLeases: AiLeaseListItem[] = [];
  isLoading = true;
  createdAiAbstractionIds = new Set<number>();
  searchText = '';
  selectedPortfolioId: number | null = null;
  portfolioOptions: Array<{ id: number; name: string }> = [];
  updatingStatusAiAbstractionId: number | null = null;

  private readonly destroy$ = new Subject<void>();
  private readonly stopPolling$ = new Subject<void>();

  constructor(
    private readonly aiLeaseService: AiLeaseService,
    private readonly exportToExcelService: ExportDevexDatagridService,
    private readonly toastService: CremToastService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          const createdIds = (
            params.get('createdAiAbstractionIds') ??
            params.get('createdAiAbstractionId') ??
            ''
          )
            .split(',')
            .map((value) => Number(value.trim()))
            .filter((value) => Number.isFinite(value) && value > 0);
          this.createdAiAbstractionIds = new Set(createdIds);
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
    const formId = event?.data?.formId;

    if (!formId) {
      this.notifyErrorMessage(
        'Missing required formId to open AI abstraction details.'
      );
      return;
    }

    if (event?.data?.id) {
      this.router.navigate([event.data.id], {
        relativeTo: this.activatedRoute,
        queryParams: { formId },
      });
    }
  }

  isProcessing(status: string): boolean {
    return ['Pending', 'Processing'].includes(status);
  }

  isCreatedRow(row: AiLeaseListItem): boolean {
    return this.createdAiAbstractionIds.has(row.id);
  }

  onSearchChanged(value: string): void {
    this.searchText = value ?? '';
    this.applyFilters();
  }

  onPortfolioChanged(selectedItems: Array<{ id: number; name: string }>): void {
    this.selectedPortfolioId = selectedItems?.[0]?.id ?? null;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedPortfolioId = null;
    this.grid?.instance?.clearFilter();
    this.grid?.instance?.clearSorting();
    this.applyFilters();
  }

  exportToExcel(): void {
    if (!this.grid?.instance) {
      return;
    }

    this.exportToExcelService.exportToExcel(
      this.grid.instance,
      'AI Lease Abstractions'
    );
  }

  openNewAbstractionModal(): void {
    this.dialog.open(AddAiLeaseModalComponent, {
      disableClose: true,
      width: '70vw',
      minWidth: '320px',
      maxWidth: '1100px',
      minHeight: '420px',
      maxHeight: '90vh',
      data: {
        objectTypeId: 4,
        objectId: 0,
        objectName: '',
      },
    });
  }

  markAsError(lease: AiLeaseListItem, event?: Event): void {
    event?.stopPropagation();

    if (!lease?.id || !this.isProcessing(lease.status)) {
      return;
    }

    if (this.updatingStatusAiAbstractionId === lease.id) {
      return;
    }

    this.dialog
      .open(AiMarkErrorDialogComponent, {
        width: '560px',
        maxWidth: '95vw',
        disableClose: true,
        data: {
          aiAbstractionId: lease.id,
          tenantName: lease.aiTenant,
          buildingName: lease.buildingName,
          currentStatus: lease.status,
        },
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((reason: string | null | undefined) => {
        if (reason == null) {
          return;
        }

        this.updatingStatusAiAbstractionId = lease.id;

        this.aiLeaseService
          .updateAiAbstractionStatus({
            aiAbstractionId: lease.id,
            status: 'Error',
            errorMessage: reason,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.updatingStatusAiAbstractionId = null;
              this.stopPolling$.next();
              this.toastService.show(
                'AI abstraction was marked as Error.',
                'Success',
                ToastState.SUCCESS,
                {
                  position: 'bottom right',
                  maxWidth: '350px',
                }
              );
              this.loadLeases();
            },
            error: () => {
              this.updatingStatusAiAbstractionId = null;
              this.notifyErrorMessage(
                'Failed to update AI abstraction status. Please try again.'
              );
            },
          });
      });
  }

  formatDateTime(value: string | null | undefined): string {
    if (!value) return '—';
    const normalized = /[Zz]$|[+-]\d{2}:\d{2}$/.test(value) ? value : value + 'Z';
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleString('en-US');
  }

  private loadLeases(showLoading = false): void {
    if (showLoading) {
      this.isLoading = true;
    }

    this.aiLeaseService
      .getLeaseList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (leases) => {
          this.leases = leases;
          this.portfolioOptions = this.buildPortfolioOptions(leases);
          this.applyFilters();
          this.isLoading = false;

          if (leases.some((lease) => this.isProcessing(lease.status))) {
            this.startPolling();
          }
        },
        error: () => {
          this.notifyErrorMessage(
            'Failed to load AI lease abstractions. Please try again.'
          );
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
          this.portfolioOptions = this.buildPortfolioOptions(leases);
          this.applyFilters();
          if (!leases.some((lease) => this.isProcessing(lease.status))) {
            this.stopPolling$.next();
          }
        },
        error: () => {
          this.stopPolling$.next();
        },
      });
  }

  private applyFilters(): void {
    const normalizedSearch = this.searchText.trim().toLowerCase();

    this.filteredLeases = this.leases.filter((lease) => {
      const matchesPortfolio =
        !this.selectedPortfolioId || lease.portfolioId === this.selectedPortfolioId;

      if (!matchesPortfolio) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableValues = [
        lease.id,
        lease.portfolioName,
        lease.buildingName,
        lease.formName,
        lease.aiTenant,
        lease.status,
        lease.createdDate,
        lease.lastModifiedDate,
      ];

      return searchableValues.some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }

  private buildPortfolioOptions(
    leases: AiLeaseListItem[]
  ): Array<{ id: number; name: string }> {
    const portfolioMap = new Map<number, string>();

    leases.forEach((lease) => {
      if (lease.portfolioId && lease.portfolioName) {
        portfolioMap.set(lease.portfolioId, lease.portfolioName);
      }
    });

    return Array.from(portfolioMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private notifyErrorMessage(errorMessage: string, title = 'Error'): void {
    this.toastService.show(errorMessage, title, ToastState.ERROR, {
      position: 'bottom right',
      maxWidth: '350px',
    });
  }
}
