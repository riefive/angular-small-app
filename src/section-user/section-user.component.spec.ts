/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SectionUserComponent } from './section-user.component';

describe('SectionUserComponent', () => {
  let component: SectionUserComponent;
  let fixture: ComponentFixture<SectionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
