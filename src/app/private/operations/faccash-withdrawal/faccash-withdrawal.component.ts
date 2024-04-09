import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faccash-withdrawal',
  templateUrl: './faccash-withdrawal.component.html',
  styleUrls: ['./faccash-withdrawal.component.scss']
})
export class FacCashWithdrawalComponent implements OnInit {
  facCashWithdrawal: FormGroup;
  beneficiaryMobileNoVar:string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.facCashWithdrawal = this.fb.group({
      beneficiaryMobileNo: ['', [Validators.required]],    
    });
  }

  onProceed() {
    this.beneficiaryMobileNoVar = this.facCashWithdrawal.get('beneficiaryMobileNo').value;
    

    //CHECKS IF ALL THE REQUIRED FORM FIELDS ARE FILLED OR NOT
    if (this.facCashWithdrawal.invalid) {
      this.facCashWithdrawal.markAllAsTouched();
      return;
    }

    console.log(this.beneficiaryMobileNoVar)
  }

  onReset() {
    this.facCashWithdrawal.reset();
  }


}