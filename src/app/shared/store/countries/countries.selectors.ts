import { FEATURE_CONFIG } from '@configs/store';
import { CountriesState, Country, SelectedCountryState } from '@models/country';
import { createFeatureSelector, createSelector, MemoizedSelector, Selector } from '@ngrx/store';

export const countriesStoreFeatureSelector: Selector<object, CountriesState> = createFeatureSelector<CountriesState> (
  FEATURE_CONFIG.ALL_COUNTRIES
);

export const selectAllCountriesList: MemoizedSelector<CountriesState, Country[]> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state?.allCountries
);

export const selectFilteredCountriesList: MemoizedSelector<CountriesState, Country[] | undefined> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state?.filter?.countries
);

export const getSelectedCountry: MemoizedSelector<CountriesState, SelectedCountryState | undefined> = createSelector(
  countriesStoreFeatureSelector,
  (state: CountriesState) => state?.selectedCountry
);
