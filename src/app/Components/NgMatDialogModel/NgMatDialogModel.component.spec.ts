/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgMatDialogModelComponent } from './NgMatDialogModel.component';

describe('NgMatDialogModelComponent', () => {
  let component: NgMatDialogModelComponent;
  let fixture: ComponentFixture<NgMatDialogModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMatDialogModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMatDialogModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
