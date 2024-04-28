import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MatStepper} from "@angular/material/stepper";
import {RefCodeTypeMaintService} from "../../../_services/refcodetype-maint.service";
import {NavigationService} from "../../../theme/layout/private-layout/navigation/nav-content/navigation.service";
import {take} from "rxjs";

@Component({
  selector: 'app-refcodetype-inquiry',
  templateUrl: './refcodetype-maint.component.html',
  styleUrls: ['./refcodetype-maint.component.scss']
})
export class RefCodeTypeMaintComponent implements OnInit {

  @ViewChild('stepper',{read:MatStepper}) stepper:MatStepper

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private refCodeService: RefCodeTypeMaintService,
              public dialog: MatDialog,
              private navService: NavigationService) {
  }
  refCodeTypeForm: FormGroup;
  refDetailForm: FormGroup;
  isLinear = false;
  refCodeTypeDesc: string;
  private lastChangeTime : string;
  isHiddenDepFlds:boolean;
  isHiddenNewRefType:boolean;
  isHiddenDepSrchBtn: boolean;
  isHiddenSubmitBtn: boolean;
  isHiddenRefSrchBtn: boolean;
  funcCodeOptions = [];

  ngOnInit() {
    this.funcCodeOptions = this.navService.getPermittedOptions();
    this.refCodeTypeForm = this.fb.group({
      funcCode: ['', [Validators.required]],
      refCodeType: ['', [Validators.required]],
    });
    this.refCodeTypeDesc = 'N/A';
    this.refDetailForm = this.fb.group({
        newRefCodeType : ['',[Validators.required]],
        refDescription: ['', [Validators.required]],
        refLength: ['', [Validators.required]],
        dependentFlg: ['', [Validators.required]],
        depRefType: ['', [Validators.required]],
        depRefCodeTypeDesc : [{value: '', disabled: true},[Validators.required]]
    });
    this.isHiddenDepFlds = false;
    this.isHiddenDepSrchBtn = false;
    this.isHiddenNewRefType = false;
    this.isHiddenSubmitBtn = false;
    this.isHiddenRefSrchBtn = false;
  }

  onSearch(funcCode:string, refTypeOrDsc:string,fromControlName:string) {

    if (this.funcCode.invalid) {
      this.funcCode.markAsTouched();
      return;
    }

    const payLoad = {
      "functionCode": funcCode,
      "refCodeType" : refTypeOrDsc
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
         title:'Reference Type Data',
         serviceName : 'getRefTypeList',
         srchPayLoad : payLoad,
      },
      disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(selectedRow => {
      if(fromControlName === 'refCodeType') {
        this.refCodeType.setValue(selectedRow?.refCodeType);
        this.refCodeTypeDesc = selectedRow?.refCodeTypeDesc;
      }
      else if(fromControlName === 'depRefType') {
        this.depRefType.setValue(selectedRow?.refCodeType);
        this.depRefCodeTypeDesc.setValue(selectedRow?.refCodeTypeDesc);
      }
    });
  }

  onNext() {
    if (this.refCodeTypeForm.invalid) {
      for (const control of Object.keys(this.refCodeTypeForm.controls)) {
        this.refCodeTypeForm.controls[control].markAsTouched();
      }
      return;
    }
    this.refCodeService.getRefTypeDetail(this.funcCode.value, this.refCodeType.value)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if(response.formData){
            this.setDetailFormFields(response.formData);
            this.stepper.next();
          }
        },
        error: err => {
          this.alertService.errorAlert(err.error.message);
        }
      });
  }
  setDetailFormFields(refCodeTypeDetail:any) {
    this.refDescription.setValue(refCodeTypeDetail.refCodeTypeDesc);
    this.refLength.setValue(refCodeTypeDetail.refCodeLen);
    this.dependentFlg.setValue(refCodeTypeDetail.depFlg);
    if(refCodeTypeDetail.depFlg === 'Y'){
      this.isHiddenDepFlds = false;
      this.depRefType.setValue(refCodeTypeDetail.depRefCodeType);
      this.depRefCodeTypeDesc.setValue(refCodeTypeDetail.depRefCodeTypeDesc);
    } else{
      this.isHiddenDepFlds = true;
      this.depRefType.setValue('');
      this.depRefCodeTypeDesc.setValue('');
    }
    this.lastChangeTime = refCodeTypeDetail.lchgTime;

  }
  onCancel() {
    this.refDetailForm.reset();
  }

  onSubmit() {
    const payLoad = {
      "functionCode": this.funcCode.value,
      "refCodeType": this.refCodeType.value,
      "newRefCodeType" : this.newRefCodeType.value,
      "refCodeTypeDesc": this.refDescription.value,
      "lchgTime": this.lastChangeTime,
      "dependentFlg": this.dependentFlg.value,
      "dependentRefCodeType": this.depRefType.value,
      "depRefCodeTypeDesc": this.depRefCodeTypeDesc.value,
      "refCodeLength": this.refLength.value,
      "menuId": this.navService.getMenuId()
    };

    this.refCodeService.submit(payLoad).pipe(take(1)).subscribe({
      next: (v) => {
        this.alertService.successAlert(v.responseMessage);
        this.stepper.previous();
      },
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  onChangeDepFlg(event: any) {
    if (this.dependentFlg.value === 'Y') {
      this.isHiddenDepFlds = false;
    }else {
      this.isHiddenDepFlds = true;
    }
    this.depRefType.setValue('');
    this.depRefCodeTypeDesc.setValue('')
  }

  disableDetailFormFields() {
    this.refDescription.disable();
    this.refLength.disable();
    this.dependentFlg.disable();
    this.depRefType.disable();
  }
  enableDetailFormFields(){
    this.refDescription.enable();
    this.refLength.enable();
    this.dependentFlg.enable();
    this.depRefType.enable();
  }

  onChangeFuncCode(event: any) {
    switch (this.funcCode.value) {
      case 'I':{
        this.disableDetailFormFields();
        this.isHiddenNewRefType = true;
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = true;
        this.isHiddenDepSrchBtn = true;
        this.isHiddenRefSrchBtn = false;
      }
        break;
      case 'C':{
        this.enableDetailFormFields();
        this.isHiddenNewRefType = false;
        this.isHiddenSubmitBtn = false;
        this.isHiddenDepSrchBtn = false;
        this.isHiddenRefSrchBtn = false;
      }
        break;
      case 'D':
      case 'V':
      case 'U':
      case 'X':{
        this.disableDetailFormFields();
        this.isHiddenNewRefType = true;
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = false;
        this.isHiddenDepSrchBtn = true;
        this.isHiddenRefSrchBtn = false;
      }
      break;
      case 'M' :{
        this.enableDetailFormFields();
        this.isHiddenNewRefType = true;
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = false;
        this.isHiddenDepSrchBtn = false;
        this.isHiddenRefSrchBtn = false;
      }
      break;
      case 'A': {
        this.enableDetailFormFields();
        this.isHiddenNewRefType = true;
        this.newRefCodeType.setValue('');
        this.isHiddenSubmitBtn = false;
        this.isHiddenDepSrchBtn = false;
        this.isHiddenRefSrchBtn = true;
      }
        break;
      default:
        break;
    }

    // reset refCodeType and Desc Field
    this.refCodeType.reset();
    this.refCodeTypeDesc = '';
  }

  get funcCode() {
    return this.refCodeTypeForm.get('funcCode');
  }

  get refCodeType() {
    return this.refCodeTypeForm.get('refCodeType');
  }

  get newRefCodeType() {
    return this.refDetailForm.get('newRefCodeType');
  }
  get refDescription() {
    return this.refDetailForm.get('refDescription');
  }

  get refLength() {
    return this.refDetailForm.get('refLength');
  }

  get dependentFlg() {
    return this.refDetailForm.get('dependentFlg');
  }

  get depRefType() {
    return this.refDetailForm.get('depRefType');
  }
  get depRefCodeTypeDesc() {
    return this.refDetailForm.get('depRefCodeTypeDesc');
  }
}
