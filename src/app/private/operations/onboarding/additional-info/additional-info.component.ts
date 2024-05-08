import {Component, EventEmitter, NgModule, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {OnboardingConstant} from "../onboarding.constant";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { CommonModule } from '@angular/common';

import {NrxGridComponent} from "../../../../shared/components/nrx-grid/nrx-grid.component";
import {ColDef} from "ag-grid-community";
import {AgGridModule} from 'ag-grid-angular';
import { NrxGridModule } from 'src/app/shared/components/nrx-grid/nrx-grid.module';

import {
  englishOnlyValidator,
  englishOnlyValidatorForFormArray,
  numbersOnlyValidator
} from "../../../../_custom-validator/custom-validators.component";
import {CommonUtil} from "../../../../_helpers/common.util";



@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  standalone: true,
  imports: [MatExpansionModule, FormsModule, ReactiveFormsModule,MatDatepickerModule,
    MatNativeDateModule,MatInputModule,AgGridModule,NrxGridModule,CommonModule],
  styleUrls: ['./additional-info.component.scss']
})


export class AdditionalInfoComponent {
  classInitializer = CommonUtil.classInitializer;

  @ViewChild(NrxGridComponent) nrxGrid: NrxGridComponent;

  incomeSegmentList: any[] = [];
  incomeSummaryTbl: ColDef[] = [
    { headerName: 'Income Source', field: 'incomeSource' },
    { headerName: 'Amount', field: 'amount', 
    editable: true, cellEditor: 'agTextCellEditor' }
  ];



  initializeData() {    
    for (let i = 0; i < 6; i++) {
       if (i === 5) {
        this.incomeSegmentList.push({ incomeSource: 'Total Amount', totalamount: '' });
      } else {
        switch (i) {
          case 1:
            this.incomeSegmentList.push({ incomeSource: 'Agriculture', agriAmount: '' });
            break;
          case 2:
            this.incomeSegmentList.push({ incomeSource: 'Business', amount: '' });
            break;
          case 3:
            this.incomeSegmentList.push({ incomeSource: 'Rent', amount: '' });
            break;
          case 4:
            this.incomeSegmentList.push({ incomeSource: 'Salary', amount: '' });
            break;
          default:
            break;
        }
      }
    }
  }

  panelOpenState = false;
  detailsForm: FormGroup;
  @Output() submitEvent =  new EventEmitter<any>();
  @Output() previousEvent = new EventEmitter<any>();



  constructor(private fb: FormBuilder) {
    
    this.initializeData();
    this.detailsForm = this.fb.group({

      //Employment Details

      organizationName:['',[Validators.required,englishOnlyValidator()]],
      position:[''],
      otherBusiness:[''],
      monthlyIncomeRange:['',[]],
      sourceOfIncome:[''],
      natureOfbusiness:[''],
      detailsOFprof:[''],

      //Introducer Information

      accountNo:[''],
      cifId:[''],
      accountTitle:[''],
      accountName:[''],
      relationWithIntro:[''],
      yearofknowIntro:[''],
      dob:[''],

      // firstName: ['', Validators.required],
      // middleName: ['', Validators.required],
      // lastName: ['', Validators.required]
    });
  }

  get organizationName() {
    return this.detailsForm.get('organizationName');
  }

  onSubmit(): void {
    console.log(this.detailsForm.value);
    const payload= {'payload': this.detailsForm.value, 'formName': OnboardingConstant.DETAILS_FORM}
    this.submitEvent.emit(payload);
  }

  previous(): void{
    const payload = {'currentForm': OnboardingConstant.DETAILS_FORM}
  this.previousEvent.emit(payload);
  }


}


