import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Country } from '@core/models/countries';
import { CountriesRestService } from '@core/services/api-rest.service';
import { CONFIGS } from '@app/shared/configs/configs';
import { Regions } from '@app/shared/models/regions.models';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  regions = new FormControl();
  searchCountry = new FormControl();
  worldRegions: Regions[] = CONFIGS.worldRegions;
  countriesList$: Observable<any> | undefined;
  displayCountriesList$: Observable<Country[]> | undefined;
  filteredCountriesList$: Observable<Country[]> | undefined;
  filteredCountries$: Observable<string[]> | undefined;

  constructor(
    private router: Router,
    private countriesRestService: CountriesRestService
  ) {}

  ngOnInit(): void {
    this.countriesList$ = this.countriesRestService.getCountriesList().pipe(
      tap(val => this.countriesRestService.setCountriesList(val)),
      map(val => val)
    );
    this.filteredCountriesList$ = this.countriesList$;
  }

  filterByRegion(region: string): void {
    this.filteredCountriesList$ = 
    (region !== '') 
    ? this.countriesRestService.getCountriesListByRegion(region).pipe(map(val => val)) 
    : this.countriesList$;
  }

  filterByText(event: Event): void {
    this.filteredCountriesList$ = this.countriesList$?.pipe(
      map((countries) => countries.filter((country: any) => country.name.official.toLowerCase().includes(event)))
    );
  }

  filterByCountry(countryCca3: string): void {
    this.filteredCountriesList$ = this.countriesList$?.pipe(
      map((countries) => countries.filter((country: any) => country.cca3 === countryCca3))
    );
  }
}
