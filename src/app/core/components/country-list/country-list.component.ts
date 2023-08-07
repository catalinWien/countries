import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { CountriesState, Country, Filter, SearchForm } from '@app/shared/models/countries';
import { Configs, CONFIGS } from '@app/shared/configs/configs';
import { Regions } from '@app/shared/models/regions.models';
import { Store, select } from '@ngrx/store';
import { storeFilter } from '@app/shared/store/countries/countries.actions';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { selectAllCountriesList, selectFilter } from '@app/shared/store/countries/countries.selectors';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, RouterModule, AngularMaterialModule, FormsModule, ReactiveFormsModule]
})
export class CountryListComponent implements OnInit {
  appConfigs: Configs;
  searchFilterForm!: FormGroup;
  worldRegions: Regions[] = CONFIGS.worldRegions;
  countriesList$?: Observable<Country[] | undefined>;
  private readonly unsubscribe: Subject<void> = new Subject<void>();
  bttnAction = signal(CONFIGS.bttnActions.null);

  constructor(
    private fb: FormBuilder,
    private store: Store<CountriesState>
  ) {
    this.appConfigs = CONFIGS;
  }

  ngOnInit(): void {
    this.initiateForm();
    this.haveFilter();
  }

  getAllCountriesList(): Observable<Country[] | undefined> {
    return this.store.pipe(
      select(selectAllCountriesList),
      map(countriesList => countriesList)
    );
  }

  initiateForm(): void {
    this.searchFilterForm = this.fb.group({
      searchByText: ['', [Validators.minLength(2)]],
      filterByRegion: ['', []]
    });
  }

  haveFilter(): void {
    this.store
      .pipe(select(selectFilter), takeUntil(this.unsubscribe))
      .subscribe((filter: Filter | undefined) => {
        (filter && filter.type) ? this.populateFormInput(filter) : '';
        this.countriesList$ = (filter && filter.type) ? this.getFilteredCountriesList() : this.getAllCountriesList();
      })
  }

  populateFormInput(filter: Filter | undefined): void {
    if (filter && filter.type) {
      this.searchFilterForm?.controls[filter.type].setValue(filter.value, {onlySelf: true});
    }
  }

  getFilteredCountriesList(): Observable<Country[] | undefined> {
    return this.store.pipe(
      select(selectFilter),
      map(countriesList => countriesList?.countries)
    );
  }

  filterCountries(filterType: string): void {
    if (this.searchFilterForm && this.searchFilterForm.value) {
      this.updateInputs(filterType);
    }
    
    this.countriesList$ = this.store.pipe(
      select(selectFilter),
      map(countriesList => countriesList?.countries)
    );
  }

  updateInputs(filterType: string): void {
    let inputValue: string[] = [];
    let valueToRefresh: string[] = [];

    Object.entries(this.searchFilterForm.value).map(([key, value]) => {
      (key === filterType) ? inputValue = [key, String(value)] : valueToRefresh = [key, String(value)];
    });
    const filterData = {type: filterType, value: inputValue[1], countries: []};

    this.store.dispatch(storeFilter(filterData));
    this.searchFilterForm.controls[valueToRefresh[0]].setValue('');
  }
}

