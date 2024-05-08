import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ColDef} from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";
import {NomineeDetailsComponent} from "./nomine-details/nominee-details.component";
import {CommonUtil} from "../../../../_helpers/common.util";
import {MatExpansionModule} from "@angular/material/expansion";
import {NrxGridModule} from "../../../../shared/components/nrx-grid/nrx-grid.module";
import {TranslateModule} from "@ngx-translate/core";
import {OnboardingConstant} from "../onboarding.constant";
@Component({
  selector: 'app-account-preferences',
  templateUrl: './account-preferences.component.html',
  styleUrls: ['./account-preferences.component.scss'],
  imports: [ReactiveFormsModule, MatExpansionModule, NrxGridModule, TranslateModule],
  standalone: true
})
export class AccountPreferencesComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,) {
  }
  accPrefForm: FormGroup;
  panelOpenState = false;
  classInitializer = CommonUtil.classInitializer;

  schemaCodeLists = [
    {val: "1", title: "AB CURRENT CLASSIC A/C"},
    {val: "2", title: "PRAPTI FARMERS CURRENT A/C"},
    {val: "3", title: "PROBASHI SHUBIDHA CURRENT A/C"},
    {val: "4", title: "PROTHOM CURRENT ACCOUNT"},
    {val: "5", title: "TARA PROTHOM CURRENT ACCOUNT"}
  ];

  modeTypeList = [
    {val: "TM", title: "Transaction Mode"},
    {val: "VM", title: "View Mode"}
  ];

  tokenTypeList = [
    {val: "HT", title: "Hardware Token"},
    {val: "ST", title: "Software Token"}
  ];

  accOpenPurposeList = [
    {val: "F", title: "Foreign Remittance"},
    {val: "I", title: "Investment"},
    {val: "LR", title: "Loan Re-payment"},
    {val: "O", title: "Others"},
    {val: "PT", title: "Personal Transaction"},
    {val: "S", title: "Salary"},
    {val: "SAV", title: "Savings"}
  ];

  srcOfFundList = [
    {val: "C", title: "Commission"},
    {val: "G", title: "Gift/Inheritance/Return on Investment"},
    {val: "O", title: "Others"},
    {val: "OB", title: "Own Business"},
    {val: "S", title: "Salary"}
  ];

  depTypeColDefs: ColDef[];
  withDrawTypeColDefs : ColDef[];
  depTypeList: any[];
  withDrawTypeList : any[];
  @Output() submitEvent =  new EventEmitter<any>();
  @Output() previousEvent = new EventEmitter<any>();

  ngOnInit() {
    this.accPrefForm = this.fb.group({
      prodCode: ['', [Validators.required]],
      schemaType: ['', [Validators.required]],
      schemaCode : ['',[Validators.required]],
      eBanking : ['',[Validators.required]],
      eStatement : ['',[Validators.required]],
      smsBanking : ['',[Validators.required]],
      iBanking : ['',[Validators.required]],
      iBankReg : ['',[Validators.required]],
      modeType : ['',[Validators.required]],
      tokenType : ['',[Validators.required]],
      accOpenPurpose : ['',[Validators.required]],
      srcOfFund : ['',[Validators.required]],
      initDep : ['',[Validators.required]],
      byCash : ['',[Validators.required]],
      byCheque : ['',[Validators.required]],
      cashAmount : ['',[Validators.required]],
      chkAmount : ['',[Validators.required]],
      chequeNo : ['',[Validators.required]],
      routingNumber : ['',[Validators.required]],
      draweeBank : ['',[Validators.required]],
      accCostCenter : ['',[Validators.required]],
      custSegment : ['AB8',[Validators.required]],
      custSec : ['',[Validators.required]],
      psoId : ['',[Validators.required]],
      mPsoId : ['',[Validators.required]],
      rPsoId : ['',[Validators.required]]
    });

    this.depTypeColDefs = [
      {field: 'depType', headerName: 'Deposit Type'},
      {field: 'totAmount', headerName: 'Total Amount', type: "numericColumn",
        valueFormatter: params => {
          if (typeof params.value === 'number') {
            return params.value.toFixed(2);
          } else {
            return params.value;
          }}
      }
    ];

    this.withDrawTypeColDefs = [
      {field: 'withDrawType', headerName: 'Withdrawal Type'},
      {field: 'totAmount', headerName: 'Total Amount',type: "numericColumn",
        valueFormatter: params => {
          if (typeof params.value === 'number') {
            return params.value.toFixed(2);
          } else {
            return params.value;
          }}
      }
    ];

    this.populateDepTypeList();
    this.populateWDTypeList()
  }

  populateDepTypeList(){
    this.depTypeList = [{
        "depType": "Total Probable Deposit",
       "totAmount" : 0
      }, {
        "depType": "Others(specify)",
        "totAmount" : 0
      }, {
        "depType": "From BO Account(Deposit/Transfer)",
        "totAmount" : 0
      }, {
        "depType": "Foreign Remittance Deposit",
        "totAmount" : 0
      }, {
        "depType": "Earning From Export",
        "totAmount" : 0
      }, {
        "depType": "Deposit (Transfer/Instrument)",
        "totAmount" : 0
      }, {
        "depType": "Cash Deposit (including online)",
        "totAmount" : 0
      }]
  }

  populateWDTypeList(){
    this.withDrawTypeList = [{
      "withDrawType": "Cash Withdrawal(including online,ATM)",
      "totAmount" : 0
    }, {
      "withDrawType": "Payment(Transfer/Instrument)",
      "totAmount" : 0
    }, {
      "withDrawType": "Foreign Remittance Withdrawal",
      "totAmount" : 0
    }, {
      "withDrawType": "Expense through Import",
      "totAmount" : 0
    }, {
      "withDrawType": "To BO Account(Deposit/Transfer)",
      "totAmount" : 0
    }, {
      "withDrawType": "Others(specify)",
      "totAmount" : 0
    }, {
      "withDrawType": "Total Probable Withdrawal",
      "totAmount" : 0
    }]
  }

  onSearch() {
  }

  onNext() {

  }

  onCancel() {
    this.accPrefForm.reset();
  }

  onSave() {
  }

  get prodCode() {
    return this.accPrefForm.get('prodCode');
  }
  get schemaType() {
    return this.accPrefForm.get('schemaType');
  }
  get schemaCode() {
    return this.accPrefForm.get('schemaCode');
  }
  get eBanking() {
    return this.accPrefForm.get('eBanking');
  }
  get eStatement() {
    return this.accPrefForm.get('eStatement');
  }
  get smsBanking() {
    return this.accPrefForm.get('smsBanking');
  }
  get iBankReg() {
    return this.accPrefForm.get('iBankReg');
  }
  get modeType(){
    return this.accPrefForm.get('modeType');
  }
  get tokenType(){
    return this.accPrefForm.get('tokenType');
  }

  get accOpenPurpose(){
    return this.accPrefForm.get('accOpenPurpose');
  }

  get srcOfFund() {
    return this.accPrefForm.get('srcOfFund');
  }
  get initDep() {
    return this.accPrefForm.get('initDep');
  }
  get cashAmount() {
    return this.accPrefForm.get('cashAmount');
  }

  get byCash() {
    return this.accPrefForm.get('byCash');
  }

  get byCheque(){
    return this.accPrefForm.get('byCheque');
  }
  get chkAmount(){
    return this.accPrefForm.get('chkAmount');
  }

  get chequeNo(){
    return this.accPrefForm.get('chequeNo');
  }

  get routingNumber(){
    return this.accPrefForm.get('routingNumber');
  }

  get draweeBank(){
    return this.accPrefForm.get('draweeBank');
  }

  get accCostCenter(){
    return this.accPrefForm.get('accCostCenter');
  }

  get custSegment(){
    return this.accPrefForm.get('custSegment');
  }
  get psoId(){
    return this.accPrefForm.get('psoId');
  }

  get mPsoId(){
    return this.accPrefForm.get('mPsoId');
  }
  get rPsoId(){
    return this.accPrefForm.get('rPsoId');
  }
  onChangeProduct($event: Event) {

  }

  onChangeSchemeType($event: Event) {

  }

  onChangeSchemaCode($event: Event) {

  }

  onChangeAccOpenPurpose($event: Event) {

  }

  onChangesrcOfFund($event: Event) {

  }

  addNominee() {
    const dialogRef = this.dialog.open(NomineeDetailsComponent, {
      width: '50%'
    });
  }

  onSubmit(): void {
    // console.log(this.detailsForm.value);
    //  const payload= {'payload': this.detailsForm.value, 'formName': OnboardingConstant.DETAILS_FORM}
    const payload = [];
    this.submitEvent.emit(payload);
  }

  previous(): void{
    const payload = {'currentForm': OnboardingConstant.DETAILS_FORM}
    this.previousEvent.emit(payload);
  }
}
