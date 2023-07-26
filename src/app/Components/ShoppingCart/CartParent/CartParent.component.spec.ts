/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartParentComponent } from './CartParent.component';

describe('CartParentComponent', () => {
  let component: CartParentComponent;
  let fixture: ComponentFixture<CartParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
