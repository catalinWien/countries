import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Country } from '@app/shared/models/countries';

@Injectable({
  providedIn: 'root'
})
export class AppRestService {
  allCountriesList$ = new Subject<Country[]>();

  constructor() {}
  
  selectedCountriesList$ = this.allCountriesList$.asObservable();

  setCountriesList(countriesList: Country[]) {
    this.allCountriesList$.next(countriesList);
  }
}
