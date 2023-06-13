import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { CountriesRestService } from './api-rest.service';
import { CONFIGS } from '@app/shared/configs/configs';
import { Country } from '../models/countries';

const PAGE_URL = '/';
const COUNTRY_ALPHA_3CODE = 'COL';
const COUNTRY_NAME = 'Colombia';
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

describe('CountriesRestService', () => {
  let service: CountriesRestService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const valueServiceSpy = jasmine.createSpyObj('CountriesRestService', ['getCountriesList', 'getCountriesListByRegion']);

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ CountriesRestService ]
    });

    service = TestBed.inject(CountriesRestService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created CountriesRestService', (() => {
    expect(service).toBeTruthy();
  }));

  it('should setCountriesList', fakeAsync(() => {
    spyOn(service,'setCountriesList').and.callThrough;

    service.setCountriesList([COUNTRY]);

    tick();

    expect(service.setCountriesList).toHaveBeenCalledOnceWith([COUNTRY]);
  }));

  it('should make a GET request and getCountriesList', (async () => {
    service.getCountriesList().subscribe(list => list);

    const req = httpTestingController.expectOne(CONFIGS.serverUrl + 'all');

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toBeNull();

    req.flush(null);
  }));

  it('should make a GET request and getCountriesListByRegion', (async () => {
    service.getCountriesListByRegion(COUNTRY_NAME).subscribe(list => list);

    const req = httpTestingController.expectOne(CONFIGS.serverUrl + 'region/' + COUNTRY_NAME);

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toBeNull();

    req.flush(null);
  }));
});

