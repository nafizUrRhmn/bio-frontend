import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacCashWithdrawalComponent } from './faccash-withdrawal.component';

describe('FacCashWithdrawalComponent', () => {
  let component: FacCashWithdrawalComponent;
  let fixture: ComponentFixture<FacCashWithdrawalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacCashWithdrawalComponent]
    });
    fixture = TestBed.createComponent(FacCashWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
