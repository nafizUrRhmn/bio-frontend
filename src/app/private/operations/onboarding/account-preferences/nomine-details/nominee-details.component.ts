import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {CommonUtil} from "../../../../../_helpers/common.util";
@Component({
  selector: 'nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatExpansionModule, MatInputModule, MatDatepickerModule, MatDialogModule, TranslateModule]
})
export class NomineeDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }
  nomineeDetailsForm: FormGroup;
  panelOpenState = false;
  classInitializer = CommonUtil.classInitializer;

  imageUrl: any;

  ngOnInit() {
    this.nomineeDetailsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName : ['',[Validators.required]]
    });
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

  get firstName() {
    return this.nomineeDetailsForm.get('firstName');
  }
  get middleName() {
    return this.nomineeDetailsForm.get('middleName');
  }
  get lastName() {
    return this.nomineeDetailsForm.get('lastName');
  }
}
