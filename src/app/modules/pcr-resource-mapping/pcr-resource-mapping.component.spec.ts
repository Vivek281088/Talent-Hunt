import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrResourceMappingComponent } from './pcr-resource-mapping.component';

describe('PcrResourceMappingComponent', () => {
  let component: PcrResourceMappingComponent;
  let fixture: ComponentFixture<PcrResourceMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PcrResourceMappingComponent]
    });
    fixture = TestBed.createComponent(PcrResourceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
