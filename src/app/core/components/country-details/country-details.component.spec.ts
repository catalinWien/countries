import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, ParamMap, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Subject, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { Country } from '@app/shared/models/countries';
import { CountryDetailsComponent } from './country-details.component';
import { CountriesRestService } from '@app/shared/services/app-rest.service';

const PAGE_URL = '/';
const COUNTRY_ALPHA_3CODE = 'COL';
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

describe('CountryDetailsComponent', () => {
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let countriesRestSpy: CountriesRestService;
  let displayNeighborhoodList = [];
  let activatedRoute: ActivatedRoute;

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
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: 'tutu' }}],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    countriesRestSpy = TestBed.inject(CountriesRestService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create CountryDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'ngOnInit\'', fakeAsync(() => {
    spyOn(component, 'ngOnInit');

    component.ngOnInit();

    activatedRoute.paramMap.pipe(
      tap((value: ParamMap) => {
        console.log('value.keys', value);
        spyOn(component, 'listCountryDetails');

        tick();

        component.listCountryDetails(COUNTRY_ALPHA_3CODE);
        // expect(component.listCountryDetails).toHaveBeenCalled();
      }
    ));

    expect(component.ngOnInit).toHaveBeenCalled();
  }));

  xit('should call \'listCountryDetails\'', fakeAsync(() => {
    spyOn(component, 'listCountryDetails');

    component.listCountryDetails(COUNTRY_ALPHA_3CODE);
    tick();

    expect(component.listCountryDetails).toHaveBeenCalledWith(COUNTRY_ALPHA_3CODE);
  }));

  xit('should get country details by cca3 value', fakeAsync(() => {
    spyOn(component, 'listCountryDetails').and.callThrough();
    spyOn(countriesRestSpy, 'getCountryDetails').and.callThrough();

    countriesRestSpy.getCountryDetails(COUNTRY_ALPHA_3CODE).pipe(
      map(country => {
        expect(country).toEqual(COUNTRY);
        expect(countriesRestSpy.getCountryDetails).toHaveBeenCalledWith(COUNTRY_ALPHA_3CODE);
        if (country) {
          component.currentCountry = country;
          component.displayNeighborhoodList = [];

          expect(component.currentCountry).toEqual(COUNTRY);
/*
          if (country?.borders && country.borders.length > 0) {
            country.borders?.map(neighborResult => {
              countriesRestSpy.getCountryDetails(neighborResult).subscribe(neighborDetails => {
                expect(neighborDetails).toEqual(COUNTRY);
              })
            });
          }
          */
        }
      })
    )

    component.listCountryDetails(COUNTRY_ALPHA_3CODE);
    
    expect(component.listCountryDetails).toHaveBeenCalledWith(COUNTRY_ALPHA_3CODE);
    
    tick();
/*
      result.borders?.map(neighborResult => {
        countriesRestSpy.getCountryDetails(neighborResult).subscribe(neighborDetails => {
          expect(neighborDetails).toEqual(COUNTRY);
        },
        error => {
          console.error(error);
          expect(console.error).toHaveBeenCalledWith(error);
        });
      });
      */
  }));
});
