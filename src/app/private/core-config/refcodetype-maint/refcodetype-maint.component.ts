import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MatStepper} from "@angular/material/stepper";
import {RefCodeTypeMaintService} from "../../../_services/refcodetype-maint.service";
import {take} from "rxjs";
import {NavigationService} from "../../../theme/layout/private-layout/navigation/nav-content/navigation.service";

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
  isVisibleDepFlds:boolean;
  isVisibleNewRefType:boolean;
  isVisibleDepSrchBtn: boolean;
  isVisibleSubmitBtn: boolean;
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
    this.isVisibleDepFlds = true;
    this.isVisibleDepSrchBtn = true;
    this.isVisibleNewRefType = false;
    this.isVisibleSubmitBtn = true;
  }

  onSearch(funcCode:string, refTypeOrDsc:string,fromControlName:string) {
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
      this.isVisibleDepFlds = true;
      this.depRefType.setValue(refCodeTypeDetail.depRefCodeType);
      this.depRefCodeTypeDesc.setValue(refCodeTypeDetail.depRefCodeTypeDesc);
    } else{
      this.isVisibleDepFlds = false;
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
      "menuId": 'RCTMM'
    };

    this.refCodeService.submit(payLoad).pipe(take(1)).subscribe({
      next: (v) => {
        this.alertService.successAlert(v.responseMessage);
      },
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  onChangeDepFlg(event: any) {
    if (this.dependentFlg.value === 'Y') {
      this.isVisibleDepFlds = true;
    }else {
      this.isVisibleDepFlds = false;
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
        this.isVisibleNewRefType = false;
        this.newRefCodeType.setValue('');
        this.isVisibleSubmitBtn = false;
        this.isVisibleDepSrchBtn = false;
      }
        break;
      case 'C':{
        this.enableDetailFormFields();
        this.isVisibleNewRefType = true;
        this.isVisibleSubmitBtn = true;
        this.isVisibleDepSrchBtn = true;
      }
        break;
      case 'D':
      case 'V':{
        this.disableDetailFormFields();
        this.isVisibleNewRefType = false;
        this.newRefCodeType.setValue('');
        this.isVisibleSubmitBtn = true;
        this.isVisibleDepSrchBtn = false;
      }
      break;
      case 'A':
      case 'U':
      case 'M':
      case 'X':{
        this.enableDetailFormFields();
        this.isVisibleNewRefType = false;
        this.newRefCodeType.setValue('');
        this.isVisibleSubmitBtn = true;
        this.isVisibleDepSrchBtn = true;
      }
        break;
      default:
        break;
    }
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
