import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-generate-fac',
  templateUrl: './generate-fac.component.html',
  styleUrls: ['./generate-fac.component.scss']
})
export class GenerateFacComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      accNumCustomer: ['', [Validators.required]],
      beneficiaryMobileNo: ['', [Validators.required]],
      beneficiaryName: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      transactionRemarks: ['', [Validators.required]],
      transactionParticular: ['', [Validators.required]],      
    });
  }

}