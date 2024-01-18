import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-insurance-premium-collection',
  templateUrl: './insurance-premium-collection.component.html',
  styleUrls: ['./insurance-premium-collection.component.scss']
})
export class InsurancePremiumCollectionComponent {

  transactionForm: FormGroup;

  selectedPaymentMode: string = 'cash';
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      policyNO: ['', [Validators.required]],
      mobileNUmber: ['', [Validators.required]],
      accNum: ['', [Validators.required]],
      accTitle: ['', [Validators.required]], 
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
