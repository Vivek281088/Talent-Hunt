import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePCRComponent } from './manage-pcr.component';

describe('ManagePCRComponent', () => {
  let component: ManagePCRComponent;
  let fixture: ComponentFixture<ManagePCRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePCRComponent]
    });
    fixture = TestBed.createComponent(ManagePCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
