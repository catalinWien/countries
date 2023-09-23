import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, finalize, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CountriesService } from '@services/countries.service';
import { 
  initAppSession, 
  initCountriesListSession, 
  setCCA3ForSelectedCountry, 
  setFilterId, 
  setFilteredCountries
} from './countries.actions';
import { from } from 'rxjs';
import { Effect } from '@store/effect';
import { Store } from '@ngrx/store';
import { CountriesState, Country } from '@models/country';
import { getSelectedCountry, selectAllCountriesList } from './countries.selectors';

@Injectable()
export class CountriesEffects extends Effect {
  countriesService: CountriesService;

  initCountriesList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(initAppSession),
        switchMap(() =>
          from(this.countriesService.initCoutriesListMethod()).pipe(
            this.dispatch((result: Country[]) => initCountriesListSession(result))
          )
        )
      )
  );

  filterCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setFilterId),
      withLatestFrom(this.store.select(selectAllCountriesList)),
      filter(([, countriesListArray]) => !!countriesListArray),
      switchMap(([filter, countriesListArray]) => 
        from(this.countriesService.filterCoutriesMethod(filter.filterId, countriesListArray)).pipe(
          this.dispatch((countries) => setFilteredCountries(countries))
        )
      )
    )
  );

  selectCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCCA3ForSelectedCountry),
      withLatestFrom(this.store.select(selectAllCountriesList), this.store.select(getSelectedCountry)),
      filter(([, , selectedCountry]) => !!selectedCountry),
      tap(([, allCountries, selectedCountry]) =>  this.countriesService.getSelectedCountry(allCountries, selectedCountry?.cca3))
    ),
    {dispatch: false}
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<CountriesState>,
    countriesService: CountriesService
  ) {
    super();
    this.countriesService = countriesService;
  }
}
