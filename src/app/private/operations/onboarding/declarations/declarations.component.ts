import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {OnboardingConstant} from "../onboarding.constant";
import {MatExpansionModule} from "@angular/material/expansion";
import { ColDef } from 'ag-grid-community';
import {AgGridModule} from 'ag-grid-angular';
import { NrxGridModule } from 'src/app/shared/components/nrx-grid/nrx-grid.module';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  standalone: true,
  imports: [MatExpansionModule, FormsModule, ReactiveFormsModule,AgGridModule,NrxGridModule],
  styleUrls: ['./declarations.component.scss']
})

export class DeclarationsComponent {
  panelOpenState = false;
  retailDeclarationsForm: FormGroup;
  @Output() submitEvent =  new EventEmitter<any>();
  @Output() previousEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.retailDeclarationsForm = this.fb.group({
      sourceOfFund: ['', Validators.required],
      benificiarOwnersIdentified: ['', Validators.required],
      pepOrNot: ['', Validators.required],
      pepSeniorManagementApproval: ['', Validators.required],
      pepInterview: ['', Validators.required],
      nameMatchWithIllegalActs: ['', Validators.required],
      overallRistRating: ['', Validators.required],
      comment: ['', Validators.required]
      
    });
  }

   columnDefs: ColDef[] = [
    { headerName: 'Risk Grading', field: 'riskGrading'},
    { headerName: 'Selection', field: 'selection' },
    { headerName: 'Risk Score', field: 'riskScore'}
  ];
  rowData = [
    { riskGrading: '(a) What does the customer do/what kind of Profession', selection: 'Yes', riskScore: 85 },
    { riskGrading: 'Low', selection: 'No', riskScore: 42 }
  ];


  onSubmit(): void {
    console.log(this.retailDeclarationsForm.value);
    const payload= {'payload': this.retailDeclarationsForm.value, 'formName': OnboardingConstant.DECLARATIONS_FORM}
    this.submitEvent.emit(payload);
  }

  previous(): void{
    const payload = {'currentForm': OnboardingConstant.DECLARATIONS_FORM}
  this.previousEvent.emit(payload);
  }


}
