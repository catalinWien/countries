import { MemoizedSelector, Selector, createFeatureSelector, createSelector } from "@ngrx/store";

import { CONFIGS } from "@app/shared/configs/configs";
import { CountriesState, Country, Filter, Neighbor, SelectedCountryState } from "@app/shared/models/countries";

export const countriesStoreFeatureSelector: Selector<object, CountriesState> = createFeatureSelector<CountriesState>( CONFIGS.store );

export const selectAllCountriesList: MemoizedSelector<CountriesState, Country[]> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state.allCountries
);

export const selectFilter: MemoizedSelector<CountriesState, Filter | undefined> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state.filter
);

export const selectCca3: MemoizedSelector<CountriesState, string | undefined> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state.selectedCountryByCca3?.cca3
);

export const selectCountryByCca3: MemoizedSelector<CountriesState, SelectedCountryState | undefined> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state.selectedCountryByCca3
);

export const selectNeighbours: MemoizedSelector<CountriesState, Neighbor[] | undefined> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state.selectedCountryByCca3?.neighbors
);