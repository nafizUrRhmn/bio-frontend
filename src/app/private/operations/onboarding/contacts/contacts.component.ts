import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {OnboardingConstant} from "../onboarding.constant";
import {MatExpansionModule} from "@angular/material/expansion";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  standalone: true,
  imports: [MatExpansionModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent {
  panelOpenState = false;
  detailsForm: FormGroup;
  @Output() submitEvent =  new EventEmitter<any>();
  @Output() previousEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }


  onSubmit(): void {
    console.log(this.detailsForm.value);
    const payload= {'payload': this.detailsForm.value, 'formName': OnboardingConstant.DETAILS_FORM}
    this.submitEvent.emit(payload);
  }

  previous(): void{
    const payload = {'currentForm': OnboardingConstant.DETAILS_FORM}
  this.previousEvent.emit(payload);
  }


}
