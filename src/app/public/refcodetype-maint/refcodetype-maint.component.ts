import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-refcodetype-inquiry',
  templateUrl: './refcodetype-maint.component.html',
  styleUrls: ['./refcodetype-maint.component.scss']
})
export class RefCodeTypeMaintComponent {
  constructor(private fb: FormBuilder) {}

  refCodeType: FormGroup = this.fb.group({
    funcCode: ['', [Validators.required]],
    refCodeType: ['', [Validators.required]],
  });

  onSearch() {

  }

  onFocusOutEvent($event: any) {
  }
}
