import { Component ,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-institution-fee-payment',
  templateUrl: './institution-fee-payment.component.html',
  styleUrls: ['./institution-fee-payment.component.scss']
})
export class InstitutionFeePaymentComponent implements OnInit {
  transactionForm: FormGroup;
  selectedOption: string = 'option1';
  // cashSelection: boolean;
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
      mobileNumber: ['', [Validators.required]],
      studentName: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      examFee: ['', [Validators.required]],
      registrationFee: ['', [Validators.required]],
      libraryFee: ['', [Validators.required]],
      transportationFee: ['', [Validators.required]],
      stationFee: ['', [Validators.required]],
      lateFee: ['', [Validators.required]],
      labFee: ['', [Validators.required]],
      welfareFee: ['', [Validators.required]],
      totalPaymentAmount: ['', [Validators.required]],
      transactionParticulars: ['', [Validators.required]],
      tuitionFee: ['', [Validators.required]],
      medicalFee: ['', [Validators.required]],
      admissionFee: ['', [Validators.required]],
      developementFee: ['', [Validators.required]],
      securityFee: ['', [Validators.required]],
      recreationFee: ['', [Validators.required]],
      sportsFee: ['', [Validators.required]],
      cultureFee: ['', [Validators.required]],
      receiptNumber: ['', [Validators.required]],
      transactionRemarks: ['', [Validators.required]],

      // DROPDOWNS
      institutionName: ['', [Validators.required]],
      section: ['', [Validators.required]],
      billMonth: ['', [Validators.required]],
      class: ['', [Validators.required]],
      sessionSemester: ['', [Validators.required]],
      billYear: ['', [Validators.required]],
      

      //ACCOUNT PAY
      accountNumber: ['', [Validators.required]],   
      accountTitle: ['', [Validators.required]],   
         
    });
  }
}

