import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { EventBusService } from 'src/app/_services/event-bus.service';
import { FormFormatService } from 'src/app/_services/form-format.service';

@Component({
  selector: 'app-cash-withdrawal',
  templateUrl: './cash-withdrawal.component.html',
  styleUrls: ['./cash-withdrawal.component.scss']
})
export class CashWithdrawalComponent {
  cashWithdrawal: FormGroup;

  accountNumber: string;
  purposeOfWithdrawal: string;
  withdrawalAmnt: string;
  transactionParticular: string;

  constructor(
    private fb: FormBuilder,
    private eventBus:EventBusService,
    private formFormat: FormFormatService
    ) {
    this.cashWithdrawal = this.fb.group({
      accountNo: ['', [Validators.required, this.maxLengthValidator]],
      accountTitle: [{ value: null, disabled: true }, [Validators.required]],
      withdrawalAmount: ['', [Validators.required]],
      purposeofWD: ['', [Validators.required]],
      tranPart: ['', [Validators.required]]
    });
  } 

  get accountNo() {
    return this.cashWithdrawal.get('accountNo');
  }
  get purposeofWD() {
    return this.cashWithdrawal.get('purposeofWD');
  };
  get withdrawalAmount() {
    return this.cashWithdrawal.get('withdrawalAmount');
  }
  get tranPart() {
    return this.cashWithdrawal.get('tranPart');
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
    this.accountNumber = this.cashWithdrawal.get('accountNo').value;
    this.purposeOfWithdrawal = this.cashWithdrawal.get('purposeofWD').value;
    this.withdrawalAmnt = this.cashWithdrawal.get('withdrawalAmount').value;
    this.transactionParticular = this.cashWithdrawal.get('tranPart').value;

    if (this.cashWithdrawal.invalid) {
      this.cashWithdrawal.markAllAsTouched();
      return;
    }

    console.log(this.accountNumber, this.purposeOfWithdrawal, this.withdrawalAmnt, this.transactionParticular)
  }

  onReset() {
    this.cashWithdrawal.reset();
  }

  onBack() {
    this.eventBus.publish({'name': 'closeCurrentTab'});
  
  }
}
