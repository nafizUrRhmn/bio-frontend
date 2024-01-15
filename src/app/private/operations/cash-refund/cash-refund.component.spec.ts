import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRefundComponent } from './cash-refund.component';

describe('CashRefundComponent', () => {
  let component: CashRefundComponent;
  let fixture: ComponentFixture<CashRefundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashRefundComponent]
    });
    fixture = TestBed.createComponent(CashRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
