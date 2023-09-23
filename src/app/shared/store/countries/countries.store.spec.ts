import { CountriesState, Country } from '@models/country';
import { Action } from '@ngrx/store';
import { getCountriesReducer, initialState } from './countries.store';
import { initCountriesListSession, initNeighborsList, setCCA3ForSelectedCountry, setFilterId, setFilteredCountries, setNeighborsForSelectedCountry, setSelectedCountry } from './countries.actions';

const FILTER_ID = 'rom';
const COUNTRY_CCA3 = 'ROM';
const NEIGHBOR = {cca3: 'HUN', name: 'Hungary'};
const COUNTRY: Country = {
  "name":
    {
      "common":"Colombia",
      "official":"Republic of Colombia",
      "nativeName":
        {
          "spa":
            {
              "official":"República de Colombia",
              "common":"Colombia"
            }
        }
    },
    "tld":[".co"],
    "cca2":"CO",
    "ccn3":"170",
    "cca3":"COL",
    "cioc":"COL",
    "status":"officially-assigned",
    "currencies":{"BBD":{"name":"Colombian peso","symbol":"$"}},
    "idd":
      {
        "root":"+5",
        "suffixes":["7"],
        independent: false,
        landlocked: false
      },
    "capital":["Bogotá"],
    "altSpellings":["CO","Republic of Colombia","República de Colombia"],
    "region":"Americas",
    "subregion":"South America",
    "languages":{"spa":"Spanish"},
    "translations":
    {
      "ara":{"official":"جمهورية كولومبيا","common":"كولومبيا"},
      "bre":{"official":"Republik Kolombia","common":"Kolombia"},
      "zho":{"official":"哥伦比亚共和国","common":"哥伦比亚"}
    },
  "latlng":[4.0,-72.0],
  "borders":["BRA","ECU","PAN","PER","VEN"],
  "area":1141748.0,
  "demonyms":
  {
    eng:{f:"Colombian", m:"Colombian"},
    fra:{f:"Colombienne", m:"Colombien"},
    fifa: "Colombienne",
    flag: "Colombienne"
  },
  "maps":
  {
    "googleMaps":"https://goo.gl/maps/RdwTG8e7gPwS62oR6",
    "openStreetMaps":"https://www.openstreetmap.org/relation/120027"
  },
  "population":50882884,
  "gini":{"2019":51.3},
  "fifa":"COL",
  "car":{"signs":["CO"],"side":"right"},
  "timezones":["UTC-05:00"],
  "continents":["South America"],
  "flags":
  {
    "png":"https://flagcdn.com/w320/co.png",
    "svg":"https://flagcdn.com/co.svg",
    "alt":"The flag of Colombia is composed of three horizontal bands of yellow, blue and red, with the yellow band twice the height of the other two bands."
  },
  "coatOfArms":
  {
    "png":"https://mainfacts.com/media/images/coats_of_arms/co.png",
    "svg":"https://mainfacts.com/media/images/coats_of_arms/co.svg"
  },
  "startOfWeek":"monday",
  "capitalInfo":{"latlng":[4.71,-74.07]}
};

describe('Countries store', () => {
  it('when action is unknown, should return initial state', () => {
    const action: Action = {} as Action;

    const result: CountriesState = getCountriesReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('when event initCountriesListSession is dispatched, should update countries store', () => {
    const result: CountriesState = getCountriesReducer(initialState, initCountriesListSession([COUNTRY]));

    expect(result.allCountries).toEqual([COUNTRY]);
  });

  it('when event setFilterId is dispatched, should update countries store', () => {
    const result: CountriesState = getCountriesReducer(initialState, setFilterId(FILTER_ID));

    expect(result.filter?.filterId).toEqual(FILTER_ID);
  });

  it('when event setFilteredCountries is dispatched, should update countries store', () => {
    const result: CountriesState = getCountriesReducer(initialState, setFilteredCountries([COUNTRY]));

    expect(result.filter?.countries).toEqual([COUNTRY]);
  });

  it('when event setCCA3ForSelectedCountry is dispatched, should update countries store', () => {
    const result: CountriesState = getCountriesReducer(initialState, setCCA3ForSelectedCountry(COUNTRY_CCA3));

    expect(result.selectedCountry?.cca3).toEqual(COUNTRY_CCA3);
  });

  it('when event setSelectedCountry is dispatched, should update countries store', () => {
    const result: CountriesState = getCountriesReducer(initialState, setSelectedCountry(COUNTRY));

    expect(result.selectedCountry?.country).toEqual(COUNTRY);
  });

  it('when event setNeighborsForSelectedCountry is dispatched, should update countries store', () => {
    const result: CountriesState = getCountriesReducer(initialState, setNeighborsForSelectedCountry([NEIGHBOR]));

    expect(result.selectedCountry?.neighbors).toEqual([NEIGHBOR]);
  });

  it('when event initNeighborsList is dispatched, should update countries store', () => {
    const result: CountriesState = getCountriesReducer(initialState, initNeighborsList());

    expect(result.selectedCountry).toBeUndefined();
  });
});