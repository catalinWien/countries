import { CountriesState } from '@app/shared/models/country';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { 
  initCountriesListSession, 
  initNeighborsList, 
  setCCA3ForSelectedCountry, 
  setFilterId, 
  setFilteredCountries, 
  setNeighborsForSelectedCountry, 
  setSelectedCountry 
} from './countries.actions';

export const initialState: CountriesState = {
  allCountries: [],
  selectedCountry: undefined,
  filter: undefined
};

const countriesReducer: ActionReducer<CountriesState> = createReducer(
  initialState,
  on(initCountriesListSession, (state, { countries }) => ({
    ...state,
    allCountries: countries
  })),
  on(setFilterId, (state, { filterId }) => ({
    ...state,
    filter: { ...state.filter!, filterId }
  })),
  on(setFilteredCountries, (state, { countries }) => ({
    ...state,
    filter: { ...state.filter!, countries: countries }
  })),
  on(setCCA3ForSelectedCountry, (state, { cca3 }) => ({
    ...state,
    selectedCountry: { ...state.selectedCountry!, cca3 }
  })),
  on(setSelectedCountry, (state, { country }) => ({
    ...state,
    selectedCountry: { ...state.selectedCountry!, country }
  })),
  on(setNeighborsForSelectedCountry, (state, { neighbors }) => ({
    ...state,
    selectedCountry: { ...state.selectedCountry!, neighbors }
  })),
  on(initNeighborsList, (state) => ({
    ...state,
    selectedCountry: undefined
  }))
);

export function getCountriesReducer(state: CountriesState | undefined, action: Action): CountriesState {
  return countriesReducer(state, action);
}
