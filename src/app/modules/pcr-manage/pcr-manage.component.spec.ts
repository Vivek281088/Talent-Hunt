import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrManageComponent } from './pcr-manage.component';

describe('PcrManageComponent', () => {
  let component: PcrManageComponent;
  let fixture: ComponentFixture<PcrManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PcrManageComponent]
    });
    fixture = TestBed.createComponent(PcrManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
