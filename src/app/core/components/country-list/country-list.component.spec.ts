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
import { Country } from '@core/models/countries';
import { CountriesRestService } from '@core/services/api-rest.service';
import { CONFIGS } from '@app/shared/configs/configs';
import { Regions } from '@app/shared/models/regions.models';

class RouterStub {
  // navigate(params): any {}
}

const COUNTRY_ALPHA_3CODE = 'COL';
const COUNTRY_NAME = 'Colombia';
const REGION_NAME = 'americas';
const COUNTRIES = [{
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
}];

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countriesRestSpy: CountriesRestService;

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
    component.countriesList$ = of(COUNTRIES);
    component.displayCountriesList$ = component.countriesList$;
    component.worldRegions = CONFIGS.worldRegions;
    countriesRestSpy = TestBed.inject(CountriesRestService);
  });

  it('should create CountryListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'ngOnInit\'', () => {
    component.ngOnInit();
    
    expect(component.worldRegions).toEqual(CONFIGS.worldRegions);
  });

  it('should get countries list', fakeAsync(() => {
    spyOn(countriesRestSpy, 'getCountriesList').and.returnValue(of(COUNTRIES));

    component.ngOnInit();

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

    component.filterByRegion(REGION_NAME);

    countriesRestSpy.getCountriesListByRegion(REGION_NAME).subscribe(result => {
      expect(result).toEqual(COUNTRIES);
    },
    error => {
      console.error(error);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  }))

  it('should select a country', () => {
    spyOn(component, 'filterByCountry');

    component.filterByCountry(COUNTRY_ALPHA_3CODE);

    expect(component.filterByCountry).toHaveBeenCalledWith(COUNTRY_ALPHA_3CODE);
  });
});
