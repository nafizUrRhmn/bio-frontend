import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faccash-withdrawal',
  templateUrl: './faccash-withdrawal.component.html',
  styleUrls: ['./faccash-withdrawal.component.scss']
})
export class FacCashWithdrawalComponent implements OnInit {
  facCashWithdrawal: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.facCashWithdrawal = this.fb.group({
      beneficiaryMobileNo: ['', [Validators.required]],    
    });
  }

}