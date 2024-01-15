import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-disbursement',
  templateUrl: './loan-disbursement.component.html',
  styleUrls: ['./loan-disbursement.component.scss']
})
export class LoanDisbursementComponent implements OnInit {
  loanDisb: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loanDisb = this.fb.group({
      linkAccNo: ['', Validators.required]
    });
  }
  get linkAccNo() {
    return this.loanDisb.get('linkAccNo');
  }
}
