import { ComponentFixture, TestBed, getTestBed, inject, fakeAsync, tick, flush } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { By } from '@angular/platform-browser';
import { map, of, tap } from 'rxjs';

import { CountryListComponent } from './country-list.component';
import { Country } from '@core/models/countries';
import { CountriesRestService } from '@core/services/api-rest.service';
import { CONFIGS } from '@app/shared/configs/configs';
import { Regions } from '@app/shared/models/regions.models';

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
    return TestBed.configureTestingModule({
      declarations: [
        CountryListComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularMaterialModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.countriesList$ = of(COUNTRIES);
    component.displayCountriesList$ = component.countriesList$;
    component.worldRegions = CONFIGS.worldRegions;
    countriesRestSpy = TestBed.inject(CountriesRestService);
  });

  it('should create CountryListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'ngOnInit\'', fakeAsync(()=>{
    component.ngOnInit();

    countriesRestSpy.getCountriesList().pipe(
      map(result => {
        expect(result.length).toBeGreaterThan(0);
      })
    );
    
    expect(component.worldRegions).toEqual(CONFIGS.worldRegions);
  }));


  it('should call filterByRegion() method with REGION_NAME', fakeAsync(()=>{
    let spyOnSelectboxChange = spyOn(component,'filterByRegion').and.callThrough();
    let inputElement = fixture.debugElement.nativeElement.querySelector('.mat-select');
    spyOn(countriesRestSpy, 'getCountriesListByRegion').and.returnValue(of(COUNTRIES));
    
    component.filterByRegion(REGION_NAME);
    fixture.detectChanges();
    tick();

    countriesRestSpy.getCountriesListByRegion('').subscribe(result => {
      expect(result).toEqual(COUNTRIES);
    },
    error => {
      console.error(error);
      expect(console.error).toHaveBeenCalledWith(error);
    });

    expect(spyOnSelectboxChange).toHaveBeenCalledOnceWith(REGION_NAME);
  }));

  it('should call filterByRegion() method without REGION_NAME', fakeAsync(()=>{
    let spyOnSelectboxChange = spyOn(component,'filterByRegion').and.callThrough();
    let inputElement = fixture.debugElement.nativeElement.querySelector('.mat-select');
    
    component.filterByRegion('');
    fixture.detectChanges();
    tick();

    expect(spyOnSelectboxChange).toHaveBeenCalledOnceWith('');
  }));

  it('should call filterByText() method without COUNTRY_NAME', fakeAsync(()=>{
    let spyOnInputTextboxChange = spyOn(component,'filterByText').and.callThrough();
    let inputElement = fixture.debugElement.nativeElement.querySelector('input');
    
    component.filterByText(COUNTRY_NAME as unknown as Event);
    fixture.detectChanges();
    tick();

    expect(spyOnInputTextboxChange).toHaveBeenCalledOnceWith(COUNTRY_NAME as unknown as Event);
  }));

  it('should call filterByCountry() method without COUNTRY_ALPHA_3CODE', fakeAsync(()=>{
    let spyOnClickOnCard = spyOn(component,'filterByCountry').and.callThrough();
    
    component.filterByCountry(COUNTRY_ALPHA_3CODE);
    fixture.detectChanges();
    tick();

    expect(spyOnClickOnCard).toHaveBeenCalledOnceWith(COUNTRY_ALPHA_3CODE);
  }));
});
