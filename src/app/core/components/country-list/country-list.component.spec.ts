import { ComponentFixture, TestBed, getTestBed, inject, fakeAsync, tick, flush } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CountryListComponent } from './country-list.component';
import { Country } from '@core/interfaces/countries';
import { CountriesRestService } from '@core/services/api-rest.service';

class RouterStub {
  navigate(params): any {
  }
}

const COUNTRY_ALPHA_3CODE = 'ROU';
const COUNTRY_NAME = 'Colombia';
const REGION_NAME = 'americas';
const WORLD_REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const COUNTRIES = [{
  name: 'Colombia',
  topLevelDomain: ['.co'],
  alpha2Code: 'CO',
  alpha3Code: 'COL',
  callingCodes: ['57'],
  capital: 'Bogotá',
  altSpellings: ['CO', 'Republic of Colombia', 'República de Colombia'],
  region: 'Americas',
  subregion: 'South America',
  population: 48759958,
  latlng: [4.0, -72.0],
  demonym: 'Colombian',
  area: 1141748.0,
  gini: 55.9,
  timezones: ['UTC-05:00'],
  borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN'],
  nativeName: 'Colombia',
  numericCode: '170',
  currencies: [{
    code: 'COP',
    name: 'Colombian peso',
    symbol: '$'
  }],
  languages: [{
    iso639_1: 'es',
    iso639_2: 'spa',
    name: 'Spanish',
    nativeName: 'Español'
  }],
  translations: {
    de: 'Kolumbien',
    es: 'Colombia',
    fr: 'Colombie',
    ja: 'コロンビア',
    it: 'Colombia',
    br: 'Colômbia',
    pt: 'Colômbia'
  },
  flag: 'https://restcountries.eu/data/col.svg',
  regionalBlocs: [{
    acronym: 'PA',
    name: 'Pacific Alliance',
    otherAcronyms: [],
    otherNames: ['Alianza del Pacífico']
  }, {
    acronym: 'USAN',
    name: 'Union of South American Nations',
    otherAcronyms: ['UNASUR', 'UNASUL', 'UZAN'],
    otherNames: ['Unión de Naciones Suramericanas', 'União de Nações Sul-Americanas', 'Unie van Zuid-Amerikaanse Naties', 'South American Union']
  }],
  cioc: 'COL'
}];

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countriesRestSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CountryListComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AngularMaterialModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    component.countriesList = COUNTRIES;
    component.displayCountriesList = COUNTRIES;
    component.worldRegions = WORLD_REGIONS;
    countriesRestSpy = TestBed.inject(CountriesRestService);
  });

  it('should create CountryListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'ngOnInit\'', () => {
    component.ngOnInit();

    expect(component.worldRegions).toEqual(WORLD_REGIONS);
  });

  it('should get countries list', fakeAsync(() => {
    spyOn(countriesRestSpy, 'getCountriesList').and.returnValue(of(COUNTRIES));

    component.listCountries();

    countriesRestSpy.getCountriesList().subscribe(result => {
      expect(result).toEqual(COUNTRIES);
    },
    error => {
      console.error(error);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  }));

  it('should get countries list by region', fakeAsync(() => {
    spyOn(countriesRestSpy, 'getCountriesListByRegion').and.returnValue(of(COUNTRIES));

    component.listCountriesByRegion(REGION_NAME);

    countriesRestSpy.getCountriesListByRegion(REGION_NAME).subscribe(result => {
      expect(result).toEqual(COUNTRIES);
    },
    error => {
      console.error(error);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  }));

  it('should select a country', () => {
    spyOn(component, 'selectCountry');

    component.selectCountry(COUNTRY_NAME);

    expect(component.selectCountry).toHaveBeenCalledWith(COUNTRY_NAME);
  });

  it('should select a country', () => {
    component.selectCountry(COUNTRY_NAME);

    expect(component.displayCountriesList).toEqual(COUNTRIES);
  });

  it('should select a region', () => {
    spyOn(component, 'selectRegion').and.callThrough();

    component.selectRegion(REGION_NAME);

    expect(component.selectRegion).toHaveBeenCalledWith(REGION_NAME);
  });

  it('should call route.navigate to go to country details page', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.countryDetails(COUNTRY_ALPHA_3CODE);

    expect(spy).toHaveBeenCalledWith(['/country/' + COUNTRY_ALPHA_3CODE]);
  }));
});
