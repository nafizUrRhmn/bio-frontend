import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-refcodetype-inquiry',
  templateUrl: './refcodetype-maint.component.html',
  styleUrls: ['./refcodetype-maint.component.scss']
})
export class RefCodeTypeMaintComponent {
  refCodeTypeForm: FormGroup;

}
