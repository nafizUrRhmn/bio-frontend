import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDepositComponent } from './cash-deposit.component';

describe('CashDepositComponent', () => {
  let component: CashDepositComponent;
  let fixture: ComponentFixture<CashDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashDepositComponent]
    });
    fixture = TestBed.createComponent(CashDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
