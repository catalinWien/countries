import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";

import {
  fetchAllCountriesList,
  storeAllCountriesList,
  storeFilter,
  storeFilteredCountries,
  storeSelectedCca3,
  storeSelectedCountryByCca3,
  storeSelectedCountryNeighbours
} from "@app/shared/store/countries/countries.actions";
import { CountriesRestService } from "@app/shared/services/countries/countries.service";
import { CountriesState, Country, Neighbor } from "@app/shared/models/countries";
import { EMPTY, OperatorFunction, catchError, filter, from, map, pipe, switchMap, tap, withLatestFrom } from "rxjs";
import { selectAllCountriesList, selectCca3, selectCountryByCca3, selectFilter } from "./countries.selectors";

@Injectable()
export class CountriesEffects {
  constructor(
    private store: Store<CountriesState>,
    private readonly actions$: Actions,
    private readonly countriesRestService: CountriesRestService
  ) {}

  dispatch<T>(next: (result: T) => Action, errorOptions?: ErrorOptions): OperatorFunction<T, Action> {
    return pipe(
      map((result) => next(result)),
      catchError((err) => {
        console.log(err);

        return EMPTY;
      })
    )
  }

  fetchAllCountriesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAllCountriesList),
      switchMap(() =>
        from(this.countriesRestService.getCountriesList().pipe(
          map((result) => storeAllCountriesList(result))
        ))
      )
    )
  )

  filterCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeFilter),
      withLatestFrom(this.store.select(selectAllCountriesList), this.store.select(selectFilter)),
      switchMap(([, countriesList, selectedFilter]) =>
        from(this.countriesRestService.filterCountriesList(countriesList, selectedFilter?.type, selectedFilter?.value).pipe(
          this.dispatch((filteredCountry: Country[]) => storeFilteredCountries(filteredCountry))
        ))
      )
    )
  )

  selectCountryByCca3$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeSelectedCca3),
      withLatestFrom(this.store.select(selectAllCountriesList), this.store.select(selectCca3)),
      switchMap(([, countriesList, selectedCca3]) =>
        from(this.countriesRestService.selectCountryByCca3(countriesList, selectedCca3!).pipe(
          this.dispatch((selectedCountry: Country | undefined) => storeSelectedCountryByCca3(selectedCountry))
        ))
      )
    )
  )

  selectNeighbours$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeSelectedCountryByCca3),
      withLatestFrom(this.store.select(selectAllCountriesList), this.store.select(selectCountryByCca3)),
      filter(([, , selectCountryByCca3]) => !!selectCountryByCca3),
      switchMap(([, countriesList, selectCountryByCca3]) =>
        from(this.countriesRestService.selectNeighboursArray(countriesList, selectCountryByCca3?.country?.borders).pipe(
          this.dispatch((selectedCountryNeighbours: Neighbor[]) => storeSelectedCountryNeighbours(selectedCountryNeighbours))
        ))
      )
    )
  )
}
