import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Router } from '@angular/router';
import { CountriesService } from './countries.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideStore } from '@ngrx/store';
import { initialState } from '@store/countries/countries.store';
import { Country } from '@models/country';
import { CONFIGS } from '@configs/configs';
import { HttpClient } from '@angular/common/http';

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

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore;
  let router = { navigate: jasmine.createSpy('navigate') };
  const valueServiceSpy = jasmine.createSpyObj('CountriesRestService', ['initCoutriesListMethod']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        provideStore(),
        provideMockStore({ initialState }),
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(CountriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setCountriesList', fakeAsync(() => {
    spyOn(service,'initCoutriesListMethod').and.callThrough;

    service.initCoutriesListMethod();

    tick();

    expect(service.initCoutriesListMethod).toHaveBeenCalledOnceWith();
  }));

  it('should make a GET request and initCoutriesListMethod', async () => {
    service.initCoutriesListMethod().then(list => list);

    const req = httpTestingController.expectOne(CONFIGS.baseUrl + 'all');

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toBeNull();

    req.flush(null);
  });

  
  it('should filter countries filterCoutriesMethod', fakeAsync(() => {
    spyOn(service, 'filterCoutriesMethod').and.callThrough();

    service.filterCoutriesMethod(COUNTRY_ALPHA_3CODE, [COUNTRY]);
    tick();
    
    expect(service.filterCoutriesMethod).toHaveBeenCalledOnceWith(COUNTRY_ALPHA_3CODE, [COUNTRY]);
  }));

  it('should return selected country', fakeAsync(() => {
    spyOn(service, 'getSelectedCountry').and.callThrough();
    
    service.getSelectedCountry([COUNTRY], COUNTRY_ALPHA_3CODE);
    tick();

    expect(service.getSelectedCountry).toHaveBeenCalledOnceWith([COUNTRY], COUNTRY_ALPHA_3CODE);
  }));

  it('should return one neighborn', () => {
    let filterResult = service.getNeighbor([COUNTRY], COUNTRY_ALPHA_3CODE);
    let result = {name: COUNTRY.name.official, cca3: COUNTRY_ALPHA_3CODE};

    expect(filterResult).toEqual(result);
  });
});