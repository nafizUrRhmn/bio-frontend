import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";
import {take} from "rxjs";
import {RefCodeMaintService} from "../../../_services/refcode-maint.service";


@Component({
  selector: 'app-refcode-maint',
  templateUrl: './refcode-maint.component.html',
  styleUrls: ['./refcode-maint.component.scss']
})
export class RefCodeMaintComponent implements OnInit {


  private selectedData: any;
  isLinear = false;
  mopCodeDescList: any;
  refTypeDesc: string;
  refCodeDesc: string;
  refCodeForm: FormGroup;
  refCodeDetailForm: FormGroup;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              public dialog: MatDialog,
              public refCodeMaintService: RefCodeMaintService) {
  }

  ngOnInit() {
    this.refCodeForm = this.fb.group({
      funcCode: ['', [Validators.required]],
      refType: ['', [Validators.required]],
      refCode: ['', Validators.required]
    });
    this.refCodeDetailForm = this.fb.group({
      shortListFlg: ['', [Validators.required]],
      depRefCode: ['', [Validators.required]],
      langCode: ['', Validators.required],
      langCodeDesc: ['', Validators.required],
      menuCodeDesc: ['', Validators.required]
    });
  }


  onSrchRefType(funcCode: string, refTypeOrDsc: string) {
    const payLoad = {
      "functionCode": funcCode,
      "refCodeType": refTypeOrDsc
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Reference Type Data',
        serviceName: 'getRefTypeList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });
  }

  onSrchRefCode(funcCode: string, refTypeOrDesc: string, refCodeOrDesc: string) {
    const payLoad = {
      "functionCode": funcCode,
      "referenceType": refTypeOrDesc,
      "referenceCode": refCodeOrDesc
    };
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      data: {
        title: 'Reference Code Data',
        serviceName: 'getRefCodeList',
        srchPayLoad: payLoad,
      },
      disableClose: true
    });
  }

  onNext() {
    if (this.refCodeForm.invalid) {
      return;
    }
    const payLoad = {
      "functionCode": this.funcCode.value,
      "referenceType": this.refType.value,
      "referenceCode": this.refCode.value
    };
    this.refCodeMaintService.getRefCodeDetail(payLoad)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.formData) {
            //this.setDetailFormFields(response.formData);
            //this.stepper.next();
          }
        },
        error: err => {
          this.alertService.errorAlert(err.error.message);
        }
      });
  }

  /*private setFormFields(selectedData: any) {
    this.refCodeForm.controls["refCodeType"].setValue(selectedData.refCodeType);
    this.refCodeDesc = selectedData.refCodeTypeDesc;
  }*/


  get funcCode() {
    return this.refCodeForm.get('funcCode');
  }

  get refType() {
    return this.refCodeForm.get('refType');
  }

  get refCode() {
    return this.refCodeForm.get('refCode');
  }

  get shortListFlg() {
    return this.refCodeForm.get('shortListFlg');
  }

  get depRefCode() {
    return this.refCodeForm.get('depRefCode');
  }

  get langCode() {
    return this.refCodeForm.get('langCode');
  }

  onFocusOutEvent($event: any) {
  }

}
