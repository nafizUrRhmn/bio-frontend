import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { EventBusService } from 'src/app/_services/event-bus.service';
import { FormFormatService } from 'src/app/_services/form-format.service';
import { environment } from 'src/environments/environment';
import { CashWithdrawalService } from './cash-withdrawal.service';
import { AlertService } from 'src/app/_services/alert-service';
import { Router } from '@angular/router';

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
    private eventBus: EventBusService,
    private formFormat: FormFormatService,
    private http: HttpClient,
    private cashWithdrawService: CashWithdrawalService,
    private alertService: AlertService,
    private router: Router
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

    if (this.cashWithdrawal.invalid) {
      this.cashWithdrawal.markAllAsTouched();
      return;
    }

    this.accountNumber = this.cashWithdrawal.get('accountNo').value;
    this.purposeOfWithdrawal = this.cashWithdrawal.get('purposeofWD').value;
    this.withdrawalAmnt = this.cashWithdrawal.get('withdrawalAmount').value;
    this.transactionParticular = this.cashWithdrawal.get('tranPart').value;

    const formData = {
      'accountNumber': this.accountNumber,
      'purposeOfWithdrawal': this.purposeOfWithdrawal,
      'withdrawalAmount': this.withdrawalAmnt,
      'transactionParticular': this.transactionParticular
    };


    console.log(this.accountNumber, this.purposeOfWithdrawal, this.withdrawalAmnt, this.transactionParticular);


    this.cashWithdrawService.saveCashWithdraw(formData).subscribe({
      next: (v) => this.alertService.successAlert("Cash Withdrawal Form Submission Successful")
        .then(() => this.cashWithdrawal.reset()),
      error: (e) => this.alertService.errorAlert("Cash Withdrawal Form Submission Failed")
    });

  }

  onReset() {
    this.cashWithdrawal.reset();
  }

  onBack() {
    this.eventBus.publish({ 'name': 'closeCurrentTab' });

  }
}
