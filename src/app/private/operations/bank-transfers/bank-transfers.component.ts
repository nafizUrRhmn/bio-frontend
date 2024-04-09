import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFormatService } from 'src/app/_services/form-format.service';

@Component({
  selector: 'app-bank-transfers',
  templateUrl: './bank-transfers.component.html',
  styleUrls: ['./bank-transfers.component.scss']
})
export class BankTransfersComponent implements OnInit {
  transactionForm: FormGroup;

  accountNumberVar: string;
  transferTypeVar: string;
  transferAmountVar: string;
  purposeOfPaymentVar: string;
  transactionRemarksVar: string;
  transactionParticularVar: string;

  constructor(
    private fb: FormBuilder,
    private formFormat: FormFormatService
    ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      accNum: ['', [Validators.required, this.maxLengthValidator]],
      transferType: ['', [Validators.required]],
      transferAmount: ['', [Validators.required]],
      purposeOfPayment: ['', [Validators.required]],
      transactionRemarks: ['', [Validators.required]],
      transactionParticular: ['', [Validators.required]],      
    });
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
    this.accountNumberVar = this.transactionForm.get('accNum').value;
    this.transferTypeVar = this.transactionForm.get('transferType').value;
    this.transferAmountVar = this.transactionForm.get('transferAmount').value;
    this.purposeOfPaymentVar = this.transactionForm.get('purposeOfPayment').value;
    this.transactionRemarksVar = this.transactionForm.get('transactionRemarks').value;
    this.transactionParticularVar = this.transactionForm.get('transactionParticular').value;

    //CHECKS IF ALL THE REQUIRED FORM FIELDS ARE FILLED OR NOT
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    console.log(this.accountNumberVar, this.transferTypeVar, this.transferAmountVar, this.purposeOfPaymentVar,this.transactionRemarksVar,this.transactionParticularVar)
  }

  onReset() {
    this.transactionForm.reset();
  }

}
