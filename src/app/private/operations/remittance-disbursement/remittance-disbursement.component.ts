import { Component ,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-remittance-disbursement',
  templateUrl: './remittance-disbursement.component.html',
  styleUrls: ['./remittance-disbursement.component.scss']
})
export class RemittanceDisbursementComponent implements OnInit{
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      documentIssueDate: [null, Validators.required],
      beneficiaryDOB: [null, Validators.required],
      documentExpireDate: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      pinNum: ['', [Validators.required]],
      senderName: ['', [Validators.required]],
      senderCountry: ['', [Validators.required]],
      beneficiaryMobileNo: ['', [Validators.required]],
      beneficiaryAddress: ['', [Validators.required]],
      // beneficiaryDocumentType: ['', [Validators.required]],      
      documentIssueDate: ['', [Validators.required]],      
      beneficiaryDistrict: ['', [Validators.required]],      
      // beneficiaryOccupation: ['', [Validators.required]],      
      // transactionPurpose: ['', [Validators.required]],      
      transactionRemarks: ['', [Validators.required]],      
      // exchangeHouseName: ['', [Validators.required]],      
      senderAddress: ['', [Validators.required]],      
      beneficiaryName: ['', [Validators.required]],      
      requestedAmount: ['', [Validators.required]],      
      beneficiaryDOB: ['', [Validators.required]],      
      documentNo: ['', [Validators.required]],      
      documentExpireDate: ['', [Validators.required]],      
      beneficiaryZIP: ['', [Validators.required]],      
      // relationshipWithSender: ['', [Validators.required]],      
      transactionParticular: ['', [Validators.required]],      
         
    });
  }
}
