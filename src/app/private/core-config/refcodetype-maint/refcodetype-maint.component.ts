import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {EventBusService} from "../../../_services/event-bus.service";
import {RefcodetypeMaintService} from "../../../_services/refcodetype-maint.service";
import {AlertService} from "../../../_services/alert-service";
import {EventNamesConstant} from "../../../_constants/event-names.constant";
import {AgbListComponent} from "../../../theme/shared/components/agb-list/agb-list.component";

@Component({
  selector: 'app-refcodetype-inquiry',
  templateUrl: './refcodetype-maint.component.html',
  styleUrls: ['./refcodetype-maint.component.scss']
})
export class RefCodeTypeMaintComponent {

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private alertService: AlertService,
              private refCodeService : RefcodetypeMaintService,
              public dialog: MatDialog,
              private eventBus: EventBusService) {
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
        this.eventBus.publish({'name': EventNamesConstant.MODAL_LIST, 'listObj': response});
      },
      error: err => {
        this.alertService.errorAlert(err.error.message);
      }
    });
    const dialogRef = this.dialog.open(AgbListComponent, {
      width: '50%',
      disableClose: true
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
