import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent {
  transactionForm: FormGroup;

  selectedPaymentMode: string = 'cash';
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      paymentCurrency: ['', [Validators.required]],
      mobileNUmber: ['', [Validators.required]],
      accNum: ['', [Validators.required]],
      accTitle: ['', [Validators.required]],
      cardNum: ['', [Validators.required]],
      cardHolderName: ['', [Validators.required]], 
      amount: ['', [Validators.required]],
      purposeOfPayment: ['', [Validators.required]],
      transactionRemarks: ['', [Validators.required]],
      transactionParticular: ['', [Validators.required]],      
    });

    
  }
  onPaymentModeChange(mode: string): void {
    this.selectedPaymentMode = mode;
  }

}
