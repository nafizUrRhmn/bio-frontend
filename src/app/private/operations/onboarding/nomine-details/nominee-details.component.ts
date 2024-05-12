import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {CommonUtil} from "../../../../_helpers/common.util";
import {OnboardingConstant} from "../onboarding.constant";
import {numbersOnlyValidator} from "../../../../_custom-validator/custom-validators.component";
import {NgIf} from "@angular/common";
import {DirectiveModule} from "../../../../directives/upper-case.directive";
import {NrxGridModule} from "../../../../shared/components/nrx-grid/nrx-grid.module";
import {ColDef, GridApi} from "ag-grid-community";
import {NrxGridComponent} from "../../../../shared/components/nrx-grid/nrx-grid.component";
@Component({
  selector: 'nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    TranslateModule,
    NgIf,
    DirectiveModule,
    NrxGridModule]
})
export class NomineeDetailsComponent implements OnInit {
  isUpdate: boolean;
  gridNode: any;
  nomineeDetailsForm: FormGroup;
  panelOpenState = false;
  classInitializer = CommonUtil.classInitializer;
  @Output() submitEvent = new EventEmitter<unknown>();
  @Output() previousEvent = new EventEmitter<unknown>();
  @ViewChild(NrxGridComponent) nrxGrid: NrxGridComponent;

  nomineeColDef: ColDef[];
  nomineeList: any[];

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.nomineeColDef = [
      { field: 'rowId', headerName: 'primary Key',hide:true ,
        cellRenderer : function (params) {
          return params.rowIndex + 1;}
        },
      { field: 'firstName', headerName: 'First Name' },
      { field: 'middleName', headerName: 'Middle Name', hide: true },
      { field: 'lastName', headerName: 'Last name' },
      { field: 'fatherName',  headerName: 'Father Name',hide:true },
      { field: 'motherName',  headerName: 'Mother Name' , hide: true},
      { field: 'spouseName',  headerName: 'Spouse Name' , hide: true},
      { field: 'relWithAppl',  headerName: 'Relation With Applicant' ,cellRenderer: params => {
          //return this.setRelWithApplValue(params.value);
          this.onChangeRelWithApplicant(params.value);
        }},
      { field: 'percentage',  headerName: 'Percentage(%)' },
      { field: 'occup',  headerName: 'Percentage',hide: true},

      // PRESENT ADDRESS
      { field: 'currAddrLine1', headerName: 'Current Address1' ,hide: true},
      { field: 'currAddrLine2', headerName: 'Current Address2', hide: true },
      { field: 'currCountry', headerName: 'Current Country' ,hide: true},
      { field: 'currCityDistrict',  headerName: 'Current District',hide:true },
      { field: 'currMobile',  headerName: 'Current Mobile' , hide: true},
      { field: 'currFax',  headerName: 'Current Fax' , hide: true},
      { field: 'currUpazilaThana',  headerName: 'Current Upazila or Thana' ,hide: true},
      { field: 'currNearLandmark',  headerName: 'Current Nearest Landmark' ,hide: true},
      { field: 'currEmail',  headerName: 'Current Email',hide: true},

      //PERMANENT ADDRESS
      { field: 'permAddrLine1', headerName: 'Permanent Address1' ,hide: true},
      { field: 'permAddrLine2', headerName: 'Permanent Address2', hide: true },
      { field: 'permCountry', headerName: 'Permanent Country' ,hide: true},
      { field: 'permCityDistrict',  headerName: 'Permanent District',hide:true },
      { field: 'permMobile',  headerName: 'Permanent Mobile' , hide: true},
      { field: 'permFax',  headerName: 'Permanent Fax' , hide: true},
      { field: 'permUpazilaThana',  headerName: 'Permanent Upazila or Thana' ,hide: true},
      { field: 'permNearLandmark',  headerName: 'Permanent Nearest Landmark' ,hide: true},
      { field: 'permEmail',  headerName: 'Permanent Email',hide: true}

    ];
    this.nomineeList = [];
    this.nomineeDetailsForm = this.fb.group({
        firstName: ['', [Validators.required]],
        middleName: ['', [Validators.required]],
        lastName : ['',[Validators.required]],
        fatherName : ['',[Validators.required]],
        motherName : ['',[Validators.required]],
        spouseName : ['',[Validators.required]],
        relWithAppl : ['',[Validators.required]],
        percentage : ['', [Validators.required, Validators.min(1), Validators.max(100), numbersOnlyValidator()]],
        occup : ['',[Validators.required]],
        // PRESENT Address
        currAddrLine1 : ['',[Validators.required]],
        currAddrLine2 : ['',[Validators.required]],
        currCountry : ['',[Validators.required]],
        currCityDistrict : ['',[Validators.required]],
        currPostCode : ['',[Validators.required]],
        currMobile : ['',[Validators.required]],
        currFax : ['',[Validators.required]],
        currDivision :  ['',[Validators.required]],
        currUpazilaThana :  ['',[Validators.required]],
        currNearLandmark :  ['',[Validators.required]],
        currEmail : ['',[Validators.required]],
         //PERMANENT ADDRESS
        sameAsPresent : [false,[Validators.required]],
        permAddrLine1 : ['',[Validators.required]],
        permAddrLine2 : ['',[Validators.required]],
        permCountry : ['',[Validators.required]],
        permCityDistrict : ['',[Validators.required]],
        permPostCode : ['',[Validators.required]],
        permMobile : ['',[Validators.required]],
        permFax : ['',[Validators.required]],
        permDivision :  ['',[Validators.required]],
        permUpazilaThana :  ['',[Validators.required]],
        permNearLandmark :  ['',[Validators.required]],
        permEmail : ['',[Validators.required]]
    });
  }

  setRelWithApplValue(paramValue:string){
    console.log(paramValue);
  }

  onSearch() {
  }

  onNext() {

  }

  onCancel() {
    this.nomineeDetailsForm.reset();
  }

  onSave() {
  }

  previous() {
    const payload = {'currentForm': OnboardingConstant.DETAILS_FORM}
    this.previousEvent.emit(payload);
  }

  onSubmit() {
    const payload = [];
    this.submitEvent.emit(payload);
  }

  onChangeRelWithApplicant($event: any) {
    return $event.target.selectedOptions[0].title;
  }

  addOnGrid(type:string) {
    let formData = this.nomineeDetailsForm.value;
    formData = {...formData};
    console.log(formData);
    let parentRows = <any>this.nrxGrid.gridApi.getRenderedNodes();
    let arr = [];
    /*let obj = parentRows.find(u => u.parMenuCode === formData.parMenuCode);
    if (!this.isUpdate && obj) {
      this.alertService.warningAlert(`Parent menu already exist ${obj.parMenuCode}`)
      return;
    }*/
    if (this.isUpdate) {
      this.gridNode.updateData(formData);
    } else {
      arr.push(formData);
    }
    this.nrxGrid.onGridReset(arr, type);
    this.nomineeDetailsForm.reset();
    this.isUpdate = false;
  }

  onRowClick($event: any) {
      this.gridNode = $event.node;
      console.log(this.gridNode.rowIndex);
      console.log(this.gridNode.data);
      let data = this.gridNode.data;
      this.nomineeDetailsForm.patchValue(data);
      this.isUpdate = true;
  }

  get firstName() {
    return this.nomineeDetailsForm.get('firstName');
  }
  get middleName() {
    return this.nomineeDetailsForm.get('middleName');
  }
  get lastName() {
    return this.nomineeDetailsForm.get('lastName');
  }
  get occup(){
    return this.nomineeDetailsForm.get('occup');
  }
  get relWithAppl(){
    return this.nomineeDetailsForm.get('relWithAppl');
  }
  get percentage(){
    return this.nomineeDetailsForm.get('percentage');
  }
  get currAddrLine1(){
    return this.nomineeDetailsForm.get('currAddrLine1');
  }
  get currAddrLine2(){
    return this.nomineeDetailsForm.get('currAddrLine2');
  }
  get currCountry(){
    return this.nomineeDetailsForm.get('currCountry');
  }
  get currCityDistrict(){
    return this.nomineeDetailsForm.get('currCityDistrict');
  }
  get currPostCode(){
    return this.nomineeDetailsForm.get('currPostCode');
  }
  get currMobile(){
    return this.nomineeDetailsForm.get('currMobile');
  }
  get currFax(){
    return this.nomineeDetailsForm.get('currFax');
  }
  get currDivision(){
    return this.nomineeDetailsForm.get('currDivision');
  }
  get currUpazilaThana(){
    return this.nomineeDetailsForm.get('currUpazilaThana');
  }
  get currNearLandmark(){
    return this.nomineeDetailsForm.get('currNearLandmark');
  }
  get currEmail(){
    return this.nomineeDetailsForm.get('currEmail');
  }
  get permAddrLine1(){
    return this.nomineeDetailsForm.get('currAddrLine1');
  }
  get permAddrLine2(){
    return this.nomineeDetailsForm.get('currAddrLine2');
  }
  get permCountry(){
    return this.nomineeDetailsForm.get('currCountry');
  }
  get permCityDistrict(){
    return this.nomineeDetailsForm.get('currCityDistrict');
  }
  get permPostCode(){
    return this.nomineeDetailsForm.get('currPostCode');
  }
  get permMobile(){
    return this.nomineeDetailsForm.get('currMobile');
  }
  get permFax(){
    return this.nomineeDetailsForm.get('currFax');
  }
  get permDivision(){
    return this.nomineeDetailsForm.get('currDivision');
  }
  get permUpazilaThana(){
    return this.nomineeDetailsForm.get('currUpazilaThana');
  }
  get permNearLandmark(){
    return this.nomineeDetailsForm.get('currNearLandmark');
  }
  get permEmail(){
    return this.nomineeDetailsForm.get('currEmail');
  }
}
