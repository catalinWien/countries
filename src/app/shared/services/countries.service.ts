import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { CONFIGS } from '@configs/configs';
import { CountriesState, Country, Neighbor } from '@models/country';
import { setNeighborsForSelectedCountry, setSelectedCountry } from '@store/countries/countries.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  configs = CONFIGS;
  
  constructor(private readonly httpClient: HttpClient, private store: Store<CountriesState>) {}

  async initCoutriesListMethod(): Promise<Country[]> {
    const url = Location.joinWithSlash(this.configs.baseUrl, 'all');

    return await lastValueFrom(this.httpClient.get(url)) as Country[];
  }

  async filterCoutriesMethod(filterId: string, countriesList: Country[]): Promise<Country[]> {
    return await countriesList.filter((country) => country.name.official.toLowerCase().includes(filterId.toLowerCase()));
  }

  getSelectedCountry(allCountriesList: Country[], selectedCountryCCA3: string | undefined): void {
    const selectedCountry = allCountriesList.find(country => country.cca3 === selectedCountryCCA3);

    this.getSelectedCountryNeighbours(allCountriesList, selectedCountry);
    
    if (selectedCountry) {
      this.store.dispatch(setSelectedCountry(selectedCountry));
    }
  }

  getSelectedCountryNeighbours(allCountriesList: Country[], selectedCountry: Country | undefined): void {
    const neighborsList: Neighbor[] = [];
    if (selectedCountry && selectedCountry.borders?.length !== 0) {
      selectedCountry.borders?.map((neighbor) => {
        neighborsList.push(this.getNeighbor(allCountriesList, neighbor))
      });
    }
    this.store.dispatch(setNeighborsForSelectedCountry(neighborsList));
  }

  getNeighbor(allCountriesList: Country[], neighborCCA3: string) {
    const neighbourCountry = allCountriesList.find(country => country.cca3 === neighborCCA3);
    return neighbourCountry ? {name: neighbourCountry.name.official, cca3: neighborCCA3} : {};
  }
}
