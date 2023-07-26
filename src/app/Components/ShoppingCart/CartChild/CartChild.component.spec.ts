/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartChildComponent } from './CartChild.component';

describe('CartChildComponent', () => {
  let component: CartChildComponent;
  let fixture: ComponentFixture<CartChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
