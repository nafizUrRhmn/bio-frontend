import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RefcodetypeMaintService} from "../../../_services/refcodetype-maint.service";
import {AlertService} from "../../../_services/alert-service";
import {AgbListComponent} from "../../../shared/components/agb-list/agb-list.component";

@Component({
  selector: 'app-refcodetype-inquiry',
  templateUrl: './refcodetype-maint.component.html',
  styleUrls: ['./refcodetype-maint.component.scss']
})
export class RefCodeTypeMaintComponent {
  private selectedData: any;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private refCodeService: RefcodetypeMaintService,
              public dialog: MatDialog) {
  }

  refCodeTypeForm: FormGroup = this.fb.group({
    funcCode: ['', [Validators.required]],
    refCodeType: ['', [Validators.required]],
  });
  refCodeDesc: string;

  onSearch() {
    let funCode = this.funcCode.value;
    let refTypeOrDsc = this.refCodeType.value;
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

  private setFormFields(selectedData: any) {
    this.refCodeTypeForm.controls["refCodeType"].setValue(selectedData.refCodeType);
    this.refCodeDesc = selectedData.refCodeTypeDesc;
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
