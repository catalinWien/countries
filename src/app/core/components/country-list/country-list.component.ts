import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Country } from '@core/models/countries';
import { CountriesRestService } from '@core/services/api-rest.service';
import { CONFIGS } from '@src/app/shared/configs/configs';
import { Regions } from '@src/app/shared/models/regions.models';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  regions = new FormControl();
  searchCountry = new FormControl();
  worldRegions: Regions[] = CONFIGS.worldRegions;
  countriesList$: Observable<any>;
  displayCountriesList$: Observable<Country[]>;
  filteredCountriesList$: Observable<Country[]>;
  filteredCountries$: Observable<string[]>;

  constructor(
    private router: Router,
    private countriesRestService: CountriesRestService
  ) {}

  ngOnInit(): void {
    this.countriesList$ = this.countriesRestService.getCountriesList().pipe(map(val => val));
    this.filteredCountriesList$ = this.countriesList$;
  }

  filterByRegion(region: string): void {
    this.filteredCountriesList$ = 
    (region !== '') 
    ? this.countriesRestService.getCountriesListByRegion(region).pipe(map(val => val)) 
    : this.countriesList$;
  }

  filterByText(event: Event): void {
    this.filteredCountriesList$ = this.countriesList$.pipe(
      map((countries) => countries.filter(country => country.name.official.toLowerCase().includes(event)))
    );
  }

  filterByCountry(countryCca3: string): void {
    console.log(countryCca3);
    this.filteredCountriesList$ = this.countriesList$.pipe(
      map((countries) => countries.filter(country => country.cca3 === countryCca3))
    );
    console.log(this.filteredCountriesList$);
  }

  countryDetails(cca3: string): void {
    const url = '/country/' + cca3;

    this.router.navigate([url]);
  }
}
