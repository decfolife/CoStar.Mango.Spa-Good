import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EndpointService } from './endpoint.service';
import { UtilitiesService } from '@mango/core-shared';
import { Api, CurrentObjectInfo } from '@mango/data-models/lib-data-models';
import { ActivatedRoute } from '@angular/router';
import {
  map,
  distinctUntilChanged,
  switchMap,
  catchError,
  startWith,
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CurrentObjectService extends EndpointService {
  private reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports);
  private cache = new Map<string, CurrentObjectInfo>();
  private cacheSubject = new BehaviorSubject<CurrentObjectInfo | null>(null);

  constructor(
    protected http: HttpClient,
    @Optional() facade: MangoAppFacade,
    private route: ActivatedRoute
  ) {
    super(http, facade);
  }

  /**
   * Retrieves the current object name and type based on query parameters
   * or optional overrides. Caches results to minimize HTTP requests.
   *
   * @param {string} [overrideOid] - Optional Object ID to override query parameter.
   * @param {string} [overrideOtid] - Optional Object Type ID to override query parameter.
   * @returns {Observable<CurrentObjectInfo>} - Observable providing the object info.
   */
  getCurentObjectNameAndType$(
    overrideOid?: string,
    overrideOtid?: string
  ): Observable<CurrentObjectInfo> {
    return this.route.queryParams.pipe(
      // Extract and override query parameters if provided
      map(({ oid, otid }) => ({
        oid: overrideOid || oid || 'defaultOid',
        otid: overrideOtid || otid || 'defaultOtid',
      })),
      // Avoid emitting duplicate values
      distinctUntilChanged(
        (prev, curr) => prev.oid === curr.oid && prev.otid === curr.otid
      ),
      // Switch to a new observable based on the latest OID and OTID
      switchMap(({ oid, otid }) => {
        const cacheKey = `${oid}-${otid}`;
        // Check if data is already cached
        if (this.cache.has(cacheKey)) {
          return of(this.cache.get(cacheKey) as CurrentObjectInfo);
        }
        // Provide default data if essential parameters are missing
        if (oid === 'defaultOid' || otid === 'defaultOtid') {
          const defaultData = {
            objectName: 'Default Name',
            objectType: 'Default Type',
          };
          this.cache.set(cacheKey, defaultData);
          return of(defaultData);
        }
        // Construct URL to fetch object information
        const url = `${this.reportsUrl}Reports/GetObjectNameAndType/${oid}/${otid}`;

        // Perform HTTP GET request and handle the response
        return this.callHttpGet(
          url,
          this.getCurentObjectNameAndType$.name
        ).pipe(
          // Map the response data and update the cache
          map(({ data }) => {
            const fullData = {
              oid: parseInt(oid),
              otid: parseInt(otid),
              objectName: data.objectName,
              objectType: data.objectType,
            };

            this.cache.set(cacheKey, fullData);
            this.cacheSubject.next(fullData);
            return fullData;
          }),
          // Handle errors and provide fallback data
          catchError(() => {
            const errorData = {
              objectName: 'Error Name',
              objectType: 'Error Type',
            };
            this.cache.set(cacheKey, errorData);
            return of(errorData);
          })
        );
      })
    );
  }
}
