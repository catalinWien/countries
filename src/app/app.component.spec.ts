import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.themeChanged = false;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the App component', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'ngOnInit\'', () => {
    spyOn(component, 'ngOnInit').and.callThrough();

    component.ngOnInit();

    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.themeChanged).toBeFalsy();
  });

  it('should call \'changeTheme\'', () => {
    spyOn(component, 'changeTheme').and.callThrough();

    component.changeTheme();

    expect(component.changeTheme).toHaveBeenCalled();
  });
});
