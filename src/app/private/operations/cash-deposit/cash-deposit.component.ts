import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-deposit',
  templateUrl: './cash-deposit.component.html',
  styleUrls: ['./cash-deposit.component.scss']
})
export class CashDepositComponent implements OnInit {
  cashDeposit: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.cashDeposit = this.fb.group({
      accountNo: ['', [Validators.required]],
      depositAmount: ['', [Validators.required]],
      sourceOfFund: ['', [Validators.required]],
      tranPart:['', [Validators.required]]
    });
  }
  get accountNo() {
    return this.cashDeposit.get('accountNo');
  }
  get depositAmount() {
    return this.cashDeposit.get('depositAmount');
  }
  get sourceOfFund() {
    return this.cashDeposit.get('sourceOfFund');
  }
  get tranPart() {
  return this.cashDeposit.get('tranPart');
  }
}
