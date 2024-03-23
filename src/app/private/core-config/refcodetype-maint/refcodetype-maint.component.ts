import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {MatStepper} from "@angular/material/stepper";
import {RefCodeTypeMaintService} from "../../../_services/refcodetype-maint.service";

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
              public dialog: MatDialog) {
  }

  refCodeTypeForm: FormGroup;
  refDetailForm: FormGroup;
  private selectedData: any;
  isLinear = false;
  refCodeDesc: string;
  depRefCodeDesc: string;

  ngOnInit() {
    this.refCodeTypeForm = this.fb.group({
      funcCode: ['', [Validators.required]],
      refCodeType: ['', [Validators.required]],
    });
    this.refCodeDesc = '';

    this.refDetailForm = this.fb.group({
        refDescription: ['', [Validators.required]],
        refLength: ['', [Validators.required]],
        dependentFlg: ['', [Validators.required]],
        depRefType: [{value: '', disabled: true}, [Validators.required]],
        deleteFlg: [, [Validators.required]]
    });
  }

  onSearch(funCode:string, refTypeOrDsc:string) {
    this.refCodeService.getRefTypeList(funCode, refTypeOrDsc).subscribe({
      next: (response) => {
        this.openDialogue(response);
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  openDialogue(response: any) {
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {title: 'Reference Type List', content: response},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      this.selectedData = res;
      this.setFormFields(this.selectedData);
    });
  }

  onNext() {
    this.refCodeService.getRefTypeDetail(this.funcCode.value, this.refCodeType.value).subscribe({
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
  private setFormFields(selectedData: any) {
    this.refCodeTypeForm.controls["refCodeType"].setValue(selectedData.refCodeType);
    this.refCodeDesc = selectedData.refCodeTypeDesc;
  }
  setDetailFormFields(refCodeTypeDetail:any) {
    console.log(refCodeTypeDetail);
    this.refDetailForm.controls['refDescription'].setValue(refCodeTypeDetail.refCodeTypeDesc);
    this.refDetailForm.controls['refLength'].setValue(refCodeTypeDetail.refCodeLen);
    this.refDetailForm.controls['dependentFlg'].setValue(refCodeTypeDetail.depFlg);
    if(refCodeTypeDetail.depFlg === 'Y'){
      this.refDetailForm.controls['depRefType'].setValue(refCodeTypeDetail.depRefCodeType);
      this.depRefCodeDesc =  refCodeTypeDetail.depRefCodeTypeDesc;
      this.refDetailForm.controls['depRefType'].enable();
    }
    else{
      this.refDetailForm.controls['depRefType'].setValue('');
      this.refDetailForm.controls['depRefType'].disable();
    }
    this.refDetailForm.controls['deleteFlg'].setValue(refCodeTypeDetail.delFlg);

  }
  get refCodeType() {
    return this.refCodeTypeForm.get('refCodeType');
  }

  get funcCode() {
    return this.refCodeTypeForm.get('funcCode');
  }

  get refDescription() {
    return this.refDetailForm.get('refDescription');
  }

  get length() {
    return this.refDetailForm.get('length');
  }

  get dependentFlg() {
    return this.refDetailForm.get('dependentFlg');
  }

  get depRefType() {
    return this.refDetailForm.get('depRefType');
  }

  get deleteFlg() {
    return this.refDetailForm.get('deleteFlg');
  }

  onFocusOutEvent($event: any) {
  }


  onCancel() {
    this.refDetailForm.reset();
  }

  onSubmit() {
    const payLoad = {
      "functionCode": this.funcCode.value,
      "refCodeType": this.refCodeType.value,
      "refCodeTypeDesc": this.refDescription.value,
      "deleteFlg": this.deleteFlg.value,
      "lchgTime": null,
      "dependentFlg": this.dependentFlg.value,
      "dependentRefCodeType": this.depRefType.value,
      "depRefCodeTypeDesc": this.depRefCodeDesc,
      "refCodeLength": this.length.value,
      "menuId": 'RCTMM'
    };

    this.refCodeService.submit(payLoad).subscribe({
      next: (response) => {
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }
}
