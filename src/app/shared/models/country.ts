export interface RegionalBlocs {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}
export interface Country {
  altSpellings: string[];
  area: number;
  borders?: string[];
  capital: string[];
  capitalInfo: CapitalInfo;
  car: Car;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
  continents: string[];
  currencies: {BBD: Currencies;};
  demonyms: Demonyms;
  flags: {
    alt:string;
    png: string;
    svg: string
  };
  idd: {
    root: string;
    suffixes: string[];
    independent: boolean;
    landlocked: boolean;
  };
  languages: {};
  latlng: number[];
  maps: {
    googleMaps: string,
    openStreetMaps: string;
  };
  name: {
    common: string;
    nativeName: {};
    official: string;
  };
  population: number;
  gini: object;
  fifa: string;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: {};
}
export interface Neighbor {
  cca3?: string;
  name?: string;
}
export interface SearchForm {
  cca3?: string;
  name?: string;
}
interface CapitalInfo {
  latlng: number[];
}
interface Car {
  signs: string[];
  side: string;
}
interface Currencies {
  name: string;
  symbol: string;
}
interface Demonyms {
  eng: {f: string; m: string};
  fra: {f: string; m: string};
  fifa: string;
  flag: string;
}
export interface CountryWithNeighbors extends Country {
  neighbors: Neighbor[]
}
export interface CountriesState {
  allCountries: Country[],
  selectedCountry?: SelectedCountryState,
  filter?: Filter
}
export interface SelectedCountryState {
  cca3?: string,
  country?: Country,
  neighbors?: Neighbor[]
}
export interface Filter {
  filterId?: string,
  countries?: Country[]
}
