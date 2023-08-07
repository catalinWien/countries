import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { Observable, lastValueFrom, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CONFIGS } from "@app/shared/configs/configs";
import { Country, Neighbor } from "@app/shared/models/countries";

@Injectable({
  providedIn: 'root'
})
export class CountriesRestService {
  private countryList: Country[] = [];

  constructor(private httpClient: HttpClient) {}

  getCountriesList(): Observable<Country[]> {
    const url = Location.joinWithSlash(CONFIGS.serverUrl, 'all');

    return this.httpClient.get<Country[]>(url).pipe(map((result: Country[]) => result));
  }

  filterCountriesList(allCountriesList: Country[], filterType?: string, filterKey?: string): Observable<Country[]> {
    let countries: Country[] = allCountriesList;

    if (filterKey) {
      switch(filterType) {
        case CONFIGS.formControlName.searchByText: {
          countries = allCountriesList.filter((country: Country) => country.name.official.toLowerCase().includes(filterKey));
          break;
        }
        case CONFIGS.formControlName.filterByRegion: {
          countries = allCountriesList.filter((country: Country) => country.region === filterKey);
          break;
        }
        default: {
          countries = allCountriesList;
          break;
        }
     }
    } 
    return of(countries);
  }

  selectCountryByCca3(allCountriesList: Country[], selectedCca3: string): Observable<Country | undefined> {
    return of(allCountriesList.find(country => country.cca3 === selectedCca3));
  }

  selectNeighboursArray(allCountriesList: Country[], neighboursCodeArray?: string[]): Observable<Neighbor[]> {
    let neighboursArray: Neighbor[] = [];

    if (neighboursCodeArray) {
      neighboursCodeArray.map(item => {
        const selectedNeighbour = allCountriesList.find(country => country.cca3 === item);
  
        neighboursArray = [...neighboursArray, {cca3: selectedNeighbour?.cca3, name: selectedNeighbour?.name.official}];
      })
    }

    return of(neighboursArray);
  }
}