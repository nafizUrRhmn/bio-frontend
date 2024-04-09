import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFormatService } from 'src/app/_services/form-format.service';

@Component({
  selector: 'app-cash-deposit',
  templateUrl: './cash-deposit.component.html',
  styleUrls: ['./cash-deposit.component.scss']
})
export class CashDepositComponent implements OnInit {
  cashDeposit: FormGroup;

  accountNumber: string;
  sourceofFund: string;
  depositAmnt: string;
  transactionParticular: string;


  constructor(
    private fb: FormBuilder,
    private formFormat: FormFormatService
    ) {}
  ngOnInit(): void {
    this.cashDeposit = this.fb.group({
      accountNo: ['', [Validators.required, this.maxLengthValidator]],
      accountTitle: [{ value: null, disabled: true }, [Validators.required]],
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

  maxLengthValidator(control: FormControl) {
    const value = control.value;
    const maxLengths = [13, 16]; 
    if (value && value.length && !maxLengths.includes(value.length)) {
      return { maxLength: true };
    }
  
    return null;
  }

  onInput(event: any) {
    this.formFormat.onAmountInput(event);
  }

  onBlur(event: any) {
    this.formFormat.onCurrency(event);
  }

  onProceed() {
    this.accountNumber = this.cashDeposit.get('accountNo').value;
    this.sourceofFund = this.cashDeposit.get('sourceOfFund').value;
    this.depositAmnt = this.cashDeposit.get('depositAmount').value;
    this.transactionParticular = this.cashDeposit.get('tranPart').value;

    //CHECKS IF ALL THE REQUIRED FORM FIELDS ARE FILLED OR NOT
    if (this.cashDeposit.invalid) {
      this.cashDeposit.markAllAsTouched();
      return;
    }

    console.log(this.accountNumber, this.sourceofFund, this.depositAmnt, this.transactionParticular)
  }

  onReset() {
    this.cashDeposit.reset();
  }
}
