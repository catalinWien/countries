import { Country, Neighbor } from '@models/country';
import { createAction } from '@ngrx/store';

export const initAppSession = createAction('[App] init app session');

export const initCountriesListSession = createAction('[App] init countries list', (countries: Country[]) => ({ countries }));

export const setFilterId = createAction('[Countries list] set filter id', (filterId: string) => ({ filterId }));

export const setFilteredCountries = createAction('[Countries list] set list of filtered countries', (countries: Country[]) => ({ countries }));

export const setCCA3ForSelectedCountry = createAction('[Countries details] set cca3 for selected country', (cca3: string | undefined) => ({ cca3 }));

export const setSelectedCountry = createAction('[Countries details] set selected country', (country: Country) => ({ country }));

export const setNeighborsForSelectedCountry = createAction('[Countries details] set neighbors for selected country', (neighbors: Neighbor[]) => ({ neighbors }));

export const initNeighborsList = createAction('[Countries details] init neighbors list');