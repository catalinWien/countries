import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

import { CountriesRestService } from './api-rest.service';

const COUNTRY_ALPHA_3CODE = 'COL';

/*
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
  
  function cntriesListUrl(): string {
    return CountriesRestService.getCountriesList();
  }

  function cntriesListByRegionUrl(countryAlpha3Code: string): string {
    return CountriesRestService.countriesListByRegionUrl(countryAlpha3Code);
  }

  it('should be created CountriesRestService', (() => {
    expect(service).toBeTruthy();
  }));

  it('should make a GET request and getCountriesList', (async () => {
    service.getCountriesList().subscribe(list => list);

    const req = httpTestingController.expectOne(cntriesListUrl());

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toBeNull();

    req.flush(null);
  }));

  it('should make a GET request and getCountriesListByRegion', (async () => {
    service.getCountriesListByRegion(COUNTRY_ALPHA_3CODE).subscribe(list => list);

    const req = httpTestingController.expectOne(cntriesListByRegionUrl(COUNTRY_ALPHA_3CODE));

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toBeNull();

    req.flush(null);
  }));
});
*/
