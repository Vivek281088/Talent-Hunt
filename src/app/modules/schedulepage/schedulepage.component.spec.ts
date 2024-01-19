import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulepageComponent } from './schedulepage.component';

import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
// import { Customer, Representative } from '../../domain/customer';
// import { CustomerService } from '../../service/customerservice';

// import { PrimeIcons } from 'primeng/api';

describe('SchedulepageComponent', () => {
  let component: SchedulepageComponent;
  let fixture: ComponentFixture<SchedulepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulepageComponent]
    });
    fixture = TestBed.createComponent(SchedulepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


