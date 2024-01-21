import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionFeePaymentComponent } from './institution-fee-payment.component';

describe('InstitutionFeePaymentComponent', () => {
  let component: InstitutionFeePaymentComponent;
  let fixture: ComponentFixture<InstitutionFeePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionFeePaymentComponent]
    });
    fixture = TestBed.createComponent(InstitutionFeePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
