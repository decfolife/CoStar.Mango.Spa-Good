import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { AiLeaseListItem } from '../models/ai-form.model';
import { AiLeaseService } from '../services/ai-lease.service';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { RequestType } from '../../model/enums/render-selects.enums';

interface PortfolioLookupItem {
  companyID?: number;
  companyName?: string;
}

interface BuildingLookupItem {
  buildingID?: number;
  buildingName?: string;
}

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

  private buildingId = 0;
  private readonly destroy$ = new Subject<void>();
  private readonly stopPolling$ = new Subject<void>();

  constructor(
    private readonly aiLeaseService: AiLeaseService,
    private readonly formWizardService: FormWizardService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (params) => {
          this.buildingId = Number(params.get('buildingId') ?? 0);
          this.createdAiAbstractionId = Number(
            params.get('createdAiAbstractionId') ?? 0
          ) || null;
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
      .getLeaseList(this.buildingId)
      .pipe(
        switchMap((leases) => this.hydrateDisplayNames(leases)),
        takeUntil(this.destroy$)
      )
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
        switchMap(() => this.aiLeaseService.getLeaseList(this.buildingId)),
        switchMap((leases) => this.hydrateDisplayNames(leases)),
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

  private hydrateDisplayNames(leases: AiLeaseListItem[]) {
    if (!leases.length) {
      return of(leases);
    }

    const portfolioIds = Array.from(
      new Set(
        leases
          .map((lease) => lease.portfolioId)
          .filter((id): id is number => typeof id === 'number' && id > 0)
      )
    );

    return forkJoin({
      portfolios: this.formWizardService
        .getRenderSelect('', RequestType.cnstDD_PortfolioList)
        .pipe(
          map((result) => this.normalizeLookupArray<PortfolioLookupItem>(result)),
          catchError(() => of([]))
        ),
      buildingsByPortfolio: portfolioIds.length
        ? forkJoin(
            portfolioIds.map((portfolioId) =>
              this.formWizardService
                .getRenderSelect(
                  portfolioId,
                  RequestType.cnstDD_GetBuildingsByUserByPortfolioForDropdown,
                  '',
                  '0',
                  '0',
                  '0',
                  1,
                  500
                )
                .pipe(
                  map((result) => ({
                    portfolioId,
                    buildings:
                      this.normalizeLookupArray<BuildingLookupItem>(result),
                  })),
                  catchError(() => of({ portfolioId, buildings: [] }))
                )
            )
          )
        : of([]),
    }).pipe(
      map(({ portfolios, buildingsByPortfolio }) => {
        const portfolioMap = new Map<number, string>();
        portfolios.forEach((portfolio) => {
          if (portfolio.companyID) {
            portfolioMap.set(portfolio.companyID, portfolio.companyName ?? '');
          }
        });

        const buildingMap = new Map<string, string>();
        buildingsByPortfolio.forEach((entry) => {
          entry.buildings.forEach((building) => {
            if (building.buildingID) {
              buildingMap.set(
                `${entry.portfolioId}:${building.buildingID}`,
                building.buildingName ?? ''
              );
            }
          });
        });

        return leases.map((lease) => ({
          ...lease,
          portfolioName:
            lease.portfolioId != null
              ? portfolioMap.get(lease.portfolioId) ||
                String(lease.portfolioId)
              : '—',
          buildingName:
            lease.portfolioId != null
              ? buildingMap.get(`${lease.portfolioId}:${lease.buildingId}`) ||
                String(lease.buildingId)
              : String(lease.buildingId),
        }));
      })
    );
  }

  private normalizeLookupArray<T>(result: any): T[] {
    const data = result?.data;
    if (Array.isArray(data)) {
      return data as T[];
    }
    if (Array.isArray(data?.items)) {
      return data.items as T[];
    }
    if (Array.isArray(data?.data)) {
      return data.data as T[];
    }
    return [];
  }
}
