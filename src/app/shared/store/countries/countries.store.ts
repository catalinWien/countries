import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { CountriesState, Country } from '@app/shared/models/countries';
import { storeAllCountriesList, storeFilter, storeFilteredCountries, storeSelectedCca3, storeSelectedCountryByCca3, storeSelectedCountryNeighbours } from './countries.actions';

export const initialState: CountriesState = {
  allCountries: [],
  selectedCountryByCca3: undefined,
  filter: undefined
}

const countriesReducer: ActionReducer<CountriesState> = createReducer(
  initialState,
  on(storeAllCountriesList, (state, { payload }) => ({
    ...state,
    allCountries: payload as Country[]
  })),
  on(storeFilter, (state, { filter }) => ({
    ...state,
    filter: filter,
    selectedCountryByCca3: undefined
  })),
  on(storeFilteredCountries, (state, { filteredCountries }) => ({
    ...state,
    filter: {type: state?.filter?.type, value: state?.filter?.value, countries: filteredCountries},
    selectedCountryByCca3: undefined
  })),
  on(storeSelectedCca3, (state, { payload }) => ({
    ...state,
    selectedCountryByCca3: {
      cca3: payload,
      country: state.selectedCountryByCca3?.country,
      neighbors: state.selectedCountryByCca3?.neighbors
    }
  })),
  on(storeSelectedCountryByCca3, (state, { payload }) => ({
    ...state,
    selectedCountryByCca3: {
      cca3: state.selectedCountryByCca3?.cca3,
      country: payload,
      neighbors: state.selectedCountryByCca3?.neighbors
    }
  })),
  on(storeSelectedCountryNeighbours, (state, { neighborArray }) => ({
    ...state,
    selectedCountryByCca3: {
      cca3: state.selectedCountryByCca3?.cca3,
      country: state.selectedCountryByCca3?.country,
      neighbors: neighborArray
    }
  }))
);

export function coutriesReducer(state: CountriesState | undefined, action: Action): CountriesState {
  return countriesReducer(state, action);
}