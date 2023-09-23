import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryCardComponent } from '@components/country-card/country-card.component';
import { CONFIGS } from '@configs/configs';
import { CountriesState, Country } from '@models/country';
import { AngularMaterialModule } from '@modules/angular-material.module';
import { Store, select } from '@ngrx/store';
import { initNeighborsList, setFilterId } from '@store/countries/countries.actions';
import { selectAllCountriesList, selectFilteredCountriesList } from '@store/countries/countries.selectors';
import { Observable, Subject, distinctUntilChanged, takeUntil, startWith, filter, combineLatest, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  imports: [ CommonModule, NgIf, NgForOf, ReactiveFormsModule, AngularMaterialModule, CountryCardComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class CountriesListComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private readonly unsubscribe: Subject<void> = new Subject<void>();
  countriesListResult$: Observable<Country[]> | undefined;
  worldRegions = CONFIGS.worldRegions;

  constructor(
    private fb: FormBuilder,
    private store: Store<CountriesState>,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchCountry: new FormControl(''),
      searchByRegion: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.store.dispatch(initNeighborsList());
    this.searchForm.get('searchCountry')?.valueChanges
    .pipe(
      startWith(''),
      distinctUntilChanged(),
      filter(filterId => filterId !== ''),
      takeUntil(this.unsubscribe)
    )
    .subscribe((filterId) => this.store.dispatch(setFilterId(filterId)));

    combineLatest([
      this.store.pipe(select(selectAllCountriesList)),
      this.store.pipe(select(selectFilteredCountriesList)),
    ]).pipe(takeUntil(this.unsubscribe))
    .subscribe(([allCountries, filteredCountries]) => {
      this.countriesListResult$ = of((filteredCountries && filteredCountries.length !== 0) ? filteredCountries : allCountries);
    });
  }

  displayCountryDetails(selectedCountryCCA3: string): void {
    this.router.navigate(['/country', selectedCountryCCA3]);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
