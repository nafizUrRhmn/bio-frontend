import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AlertService} from "../../_services/alert-service";
import {ErrorCodeConstant} from "../../_constants/error-code.constant";
import {RefcodetypeMaintService} from "../../_services/refcodetype-maint.service";

@Component({
  selector: 'app-refcodetype-inquiry',
  templateUrl: './refcodetype-maint.component.html',
  styleUrls: ['./refcodetype-maint.component.scss']
})
export class RefCodeTypeMaintComponent {

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private alertService: AlertService,
              private refCodeService : RefcodetypeMaintService) {
  }

  refCodeTypeForm: FormGroup = this.fb.group({
    funcCode: ['', [Validators.required]],
    refCodeType: ['', [Validators.required]],
  });

  onSearch() {

    let funCode = this.funcCode.value;
    let refTypeOrDsc = this.refCodeType.value;

    this.refCodeService.getRefTypeList(funCode,refTypeOrDsc).subscribe({
      next: (response) => {
        console.log(response.dataBlock);
        alert(response.headerInfo + "" + response.dataBlock);
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });
  }

  get refCodeType() {
    return this.refCodeTypeForm.get('refCodeType');
  }

  get funcCode() {
    return this.refCodeTypeForm.get('funcCode');
  }

  onFocusOutEvent($event: any) {
  }
}
