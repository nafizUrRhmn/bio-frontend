import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-disbursement',
  templateUrl: './loan-disbursement.component.html',
  styleUrls: ['./loan-disbursement.component.scss']
})
export class LoanDisbursementComponent implements OnInit {
  loanDisb: FormGroup;

  linkAccountNumber:string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanDisb = this.fb.group({
      linkAccNo: ['', [Validators.required,this.maxLengthValidator]]
    });
  }
  get linkAccNo() {
    return this.loanDisb.get('linkAccNo');
  }

  maxLengthValidator(control: FormControl) {
    const value = control.value;
    const maxLengths = [13, 16]; 
    if (value && value.length && !maxLengths.includes(value.length)) {
      return { maxLength: true };
    }
  
    return null;
  }

  onProceed() {
    this.linkAccountNumber = this.loanDisb.get('linkAccNo').value;
  
    //CHECKS IF ALL THE REQUIRED FORM FIELDS ARE FILLED OR NOT
    if (this.loanDisb.invalid) {
      this.loanDisb.markAllAsTouched();
      return;
    }

    console.log(this.linkAccountNumber)
  }

  onReset() {
    this.loanDisb.reset();
  }

}
