import { createAction, props } from "@ngrx/store";

import { Country, Filter } from "@app/shared/models/countries";
import { Neighbor } from '../../models/countries';

export const fetchAllCountriesList = createAction('[CountriesList] fetch list of all countries');

export const storeAllCountriesList = createAction('[CountriesList] store list of all countries', (payload: Country[]) => ({ payload }));

export const storeFilter = createAction('[CountriesList] store filter criteria', (filter: Filter) => ({ filter }));

export const storeFilteredCountries = createAction('[CountriesList] store filtered countries', (filteredCountries: Country[]) => ({ filteredCountries }));

export const storeSelectedCca3 = createAction('[CountriesList] store selected cca3', (payload: string) => ({ payload }));

export const storeSelectedCountryByCca3 = createAction('[CountriesList] store selected country by cca3', (payload: Country | undefined) => ({ payload }));

export const storeSelectedCountryNeighbours = createAction('[CountriesList] store neighbours of selected country', (neighborArray: Neighbor[]) => ({ neighborArray }));