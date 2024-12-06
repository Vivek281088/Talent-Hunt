import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePcrComponent } from './manage-pcr.component';

describe('ManagePcrComponent', () => {
  let component: ManagePcrComponent;
  let fixture: ComponentFixture<ManagePcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePcrComponent]
    });
    fixture = TestBed.createComponent(ManagePcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
