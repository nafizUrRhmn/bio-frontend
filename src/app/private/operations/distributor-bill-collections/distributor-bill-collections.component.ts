import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-distributor-bill-collections',
  templateUrl: './distributor-bill-collections.component.html',
  styleUrls: ['./distributor-bill-collections.component.scss']
})
export class DistributorBillCollectionsComponent {

  transactionForm: FormGroup;
  selectedOption: string = 'option1';

  accountPaySelection: boolean;

  onRadioChange(box: string) {
    if(box==='cash'){
      this.accountPaySelection=false;
    }
    else if(box==='accountPay'){
      this.accountPaySelection = true;
    }
  }
  
  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      
    });
  }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({

      //CASH PAY
      distributorId: ['', [Validators.required]],
      distributorsName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      transactionParticulars: ['', [Validators.required]],
      paymentAmount: ['', [Validators.required]],
      transactionRemarks: ['', [Validators.required]],
     

      // DROPDOWNS
      companyName: ['', [Validators.required]],
      
      
      

      //ACCOUNT PAY
      accountNumber: ['', [Validators.required]],   
      accountTitle: ['', [Validators.required]],   
         
    });
  }

}
