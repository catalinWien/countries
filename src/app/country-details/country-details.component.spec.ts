import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CountriesDetailsComponent } from "./country-details.component";
import { Router, provideRouter } from '@angular/router';
import { APP_ROUTES } from "@routes/app.route";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from "@ngrx/store";
import { getCountriesReducer } from "@store/countries/countries.store";
import { NavigationService } from "@services/navigation.service";
  
const COUNTRY_CCA3 = 'ROM';

describe('CountriesDetailsComponent', () => {
  let component: CountriesDetailsComponent;
  let fixture: ComponentFixture<CountriesDetailsComponent>;
  let router: jasmine.SpyObj<Router>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CountriesDetailsComponent
      ],
      providers: [
        provideRouter(APP_ROUTES),
        provideAnimations(),
        provideStore({ countries: getCountriesReducer }),
        NavigationService,
        { provide: NavigationService, useValue: jasmine.createSpyObj('NavigationService', ['back']) }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(CountriesDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToNeighborDetails() method', () => {
    spyOn(component, 'goToNeighborDetails').and.callThrough();
    spyOn(router, 'navigate');
    
    component.goToNeighborDetails(COUNTRY_CCA3);
    fixture.detectChanges();
  
    expect(component.goToNeighborDetails).toHaveBeenCalledWith(COUNTRY_CCA3);
    expect(router.navigate).toHaveBeenCalledWith([ '/country', COUNTRY_CCA3 ]);
  });

  it('should call goBack() method', () => {
    spyOn(component, 'goBack').and.callThrough();
    
    component.goBack();
    fixture.detectChanges();
  
    expect(component.goBack).toHaveBeenCalled();
  });
});