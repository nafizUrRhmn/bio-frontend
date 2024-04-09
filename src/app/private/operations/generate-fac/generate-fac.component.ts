import { FormFormatService } from './../../../_services/form-format.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-generate-fac',
  templateUrl: './generate-fac.component.html',
  styleUrls: ['./generate-fac.component.scss']
})
export class GenerateFacComponent implements OnInit {
  transactionForm: FormGroup;

  accNumCustomerVar:string;
  beneficiaryMobileNoVar:string;
  beneficiaryNameVar:string;
  amountVar:string;
  transactionRemarksVar:string;
  transactionParticularVar:string;

  constructor(
    private fb: FormBuilder,
    private formFormat:FormFormatService
    ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      accNumCustomer: ['', [Validators.required,this.maxLengthValidator]],
      beneficiaryMobileNo: ['', [Validators.required]],
      beneficiaryName: ['', [Validators.required]],
      amount: ['', [Validators.required]],
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
    this.accNumCustomerVar = this.transactionForm.get('accNumCustomer').value;
    this.beneficiaryMobileNoVar = this.transactionForm.get('beneficiaryMobileNo').value;
    this.beneficiaryNameVar = this.transactionForm.get('beneficiaryName').value;
    this.amountVar = this.transactionForm.get('amount').value;
    this.transactionRemarksVar = this.transactionForm.get('transactionRemarks').value;
    this.transactionParticularVar = this.transactionForm.get('transactionParticular').value;

    //CHECKS IF ALL THE REQUIRED FORM FIELDS ARE FILLED OR NOT
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    console.log(this.accNumCustomerVar, this.beneficiaryMobileNoVar, this.beneficiaryNameVar,
       this.amountVar,this.transactionRemarksVar,this.transactionParticularVar)
  }

  onReset() {
    this.transactionForm.reset();
  }


}