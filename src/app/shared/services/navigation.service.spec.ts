import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';
 
const eventSubject = new ReplaySubject<RouterEvent>(1);

const RouterMock = {
  navigate: jasmine.createSpy('navigate'),
  events: eventSubject.asObservable(),
  url: ''
}

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Router, useValue: RouterMock }
      ]
    });

    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call displayCountryDetails() method', fakeAsync(() => {
    spyOn(service, 'back').and.callThrough();
    eventSubject.next(new NavigationEnd(1, 'country', 'redirectUrl'));

    service.back();
    tick();
  
    expect(service.back).toHaveBeenCalled();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['/']);
  }));
});