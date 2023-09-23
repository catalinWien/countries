import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideStore } from "@ngrx/store";
import { CountriesListComponent } from "./countries-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { setFilterId } from "@store/countries/countries.actions";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { initialState } from "@store/countries/countries.store";
import { Router } from "@angular/router";

const FILTER_ID = 'rom';
const COUNTRY_CCA3 = 'ROM';

describe('CountriesListComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;
  let store: MockStore;
  let router = { navigate: jasmine.createSpy('navigate') };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesListComponent, BrowserAnimationsModule],
      providers: [
        provideStore(),
        provideMockStore({ initialState }),
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });
  
  it('should create CountriesListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setFilterId() on form change', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.searchForm.controls['searchCountry'].setValue(FILTER_ID);
    
    fixture.detectChanges();
  
    expect(dispatchSpy).toHaveBeenCalledWith(setFilterId(FILTER_ID));
  });

  it('should call displayCountryDetails() method', () => {
    spyOn(component, 'displayCountryDetails').and.callThrough();
    
    component.displayCountryDetails(COUNTRY_CCA3);
    fixture.detectChanges();
  
    expect(component.displayCountryDetails).toHaveBeenCalledWith(COUNTRY_CCA3);
    expect(router.navigate).toHaveBeenCalledWith(['/country', COUNTRY_CCA3]);
  });
});