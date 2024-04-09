import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-installment',
  templateUrl: './loan-installment.component.html',
  styleUrls: ['./loan-installment.component.scss']
})
export class LoanInstallmentComponent implements OnInit {
  loanInsMnt: FormGroup;
  operatingAccountNumber:string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanInsMnt = this.fb.group({
      optAcctNo: ['', [Validators.required,this.maxLengthValidator]]
    });
  }
  get optAcctNo() {
    return this.loanInsMnt.get('optAcctNo');
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
    this.operatingAccountNumber = this.loanInsMnt.get('optAcctNo').value;
  
    //CHECKS IF ALL THE REQUIRED FORM FIELDS ARE FILLED OR NOT
    if (this.loanInsMnt.invalid) {
      this.loanInsMnt.markAllAsTouched();
      return;
    }

    console.log(this.operatingAccountNumber)
  }

  onReset() {
    this.loanInsMnt.reset();
  }
}
