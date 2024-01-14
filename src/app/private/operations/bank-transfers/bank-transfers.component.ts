import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-transfers',
  templateUrl: './bank-transfers.component.html',
  styleUrls: ['./bank-transfers.component.scss']
})
export class BankTransfersComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      accNum: ['', [Validators.required]],
      transferType: ['', [Validators.required]],
      transferAmount: ['', [Validators.required]],
      purposeOfPayment: ['', [Validators.required]],
      transactionRemarks: ['', [Validators.required]],
      transactionParticular: ['', [Validators.required]],      
    });
  }

}
