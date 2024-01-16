import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceDisbursementComponent } from './remittance-disbursement.component';

describe('RemittanceDisbursementComponent', () => {
  let component: RemittanceDisbursementComponent;
  let fixture: ComponentFixture<RemittanceDisbursementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemittanceDisbursementComponent]
    });
    fixture = TestBed.createComponent(RemittanceDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
