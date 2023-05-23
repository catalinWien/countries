import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { CountryDetailsComponent } from './country-details.component';
import { CountriesRestService } from '@core/services/api-rest.service';

const PAGE_URL = '/';
const COUNTRY_ALPHA_3CODE = 'AFG';
const COUNTRY = {
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
};

describe('CountryDetailsComponent', () => {
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let countriesRestSpy;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        CountryDetailsComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([]),
        AngularMaterialModule
      ],
      providers: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    countriesRestSpy = TestBed.inject(CountriesRestService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create CountryDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'ngOnInit\'', fakeAsync(() => {
    spyOn(component, 'ngOnInit');

    component.ngOnInit();
    tick();

    expect(component.ngOnInit).toHaveBeenCalled();
  }));

  it('should call \'listCountryDetails\'', fakeAsync(() => {
    spyOn(component, 'listCountryDetails');

    component.listCountryDetails(COUNTRY_ALPHA_3CODE);
    tick();

    expect(component.listCountryDetails).toHaveBeenCalledWith(COUNTRY_ALPHA_3CODE);
  }));

  it('should get country details', fakeAsync(() => {
    spyOn(countriesRestSpy, 'getCountryDetails').and.returnValue(of(COUNTRY));

    component.listCountryDetails(COUNTRY_ALPHA_3CODE);

    countriesRestSpy.getCountryDetails(COUNTRY_ALPHA_3CODE).subscribe(result => {
      expect(result).toEqual(COUNTRY);
    },
    error => {
      console.error(error);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  }));

  it('should redirect to main page after click on \'Back\' button', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button.back-button')).nativeElement as HTMLInputElement;

    buttonElement.click();
    router.navigate([PAGE_URL]);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith([PAGE_URL]);
      flush();
    });
  });

  it('should goToNeighbor', () => {
    spyOn(component, 'goToNeighbor').and.callThrough();

    component.goToNeighbor(COUNTRY_ALPHA_3CODE);

    expect(component.goToNeighbor).toHaveBeenCalledWith(COUNTRY_ALPHA_3CODE);
  });
});
