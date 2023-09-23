import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { provideStore } from "@ngrx/store";
import { initialState } from "@store/countries/countries.store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { initAppSession } from "@store/countries/countries.actions";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideStore(),
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should dispatch initAppSession() on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    
    TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  
    expect(dispatchSpy).toHaveBeenCalledWith(initAppSession());
  });
});