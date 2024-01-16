import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-withdrawal',
  templateUrl: './cash-withdrawal.component.html',
  styleUrls: ['./cash-withdrawal.component.scss']
})
export class CashWithdrawalComponent implements OnInit {
  cashWithdrawal: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cashWithdrawal = this.fb.group({
      accountNo: ['', [Validators.required]],
      withdrawalAmount: ['', [Validators.required]],
      purposeofWD: ['', [Validators.required]],
      tranPart: ['', [Validators.required]]
    });
  }
  get accountNo() {
    return this.cashWithdrawal.get('accountNo');
  }
  get purposeofWD(){
    return this.cashWithdrawal.get('purposeofWD');
  };
  get withdrawalAmount() {
    return this.cashWithdrawal.get('withdrawalAmount');
  }
  get tranPart() {
    return this.cashWithdrawal.get('tranPart');
  }
}
