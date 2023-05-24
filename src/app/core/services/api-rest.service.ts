import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { Country } from '@core/models/countries';
import { CONFIGS } from '@app/shared/configs/configs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesRestService {
  static getCountriesList(): string {
    throw new Error('Method not implemented.');
  }
  static countriesListByRegionUrl(countryAlpha3Code: string): string {
    throw new Error('Method not implemented.');
  }
  constructor(
    private httpClient: HttpClient
  ) {}

  getCountriesList(): Observable<Country[]> {
    const url = Location.joinWithSlash(CONFIGS.serverUrl, 'all');
    return this.httpClient.get<Country[]>(url).pipe(
      map(
        (response) => response,
        catchError((err: HttpErrorResponse) => (err.status === 404 ? of([]) : throwError(err)))
      )
    );
  }

  getCountriesListByRegion(regionName: string): Observable<Country[]> {
    const url = Location.joinWithSlash(CONFIGS.serverUrl, 'region/' + regionName);
    return this.httpClient.get<Country[]>(url).pipe(
      map(
        (response) => response,
        catchError((err: HttpErrorResponse) => (err.status === 404 ? of([]) : throwError(err)))
      )
    );
  }

  getCountryDetails(countryAlpha3Code: string): Observable<Country> {
    const url = Location.joinWithSlash(CONFIGS.serverUrl, 'alpha/' + countryAlpha3Code);
    return this.httpClient.get<Country>(url).pipe(
      map(
        (response) => response,
        catchError((err: HttpErrorResponse) => (err.status === 404 ? of([]) : throwError(err)))
      )
    );
  }
}
