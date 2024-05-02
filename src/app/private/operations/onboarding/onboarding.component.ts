import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  isLinear = false;
  detailsForm: FormGroup;
  contactForm : FormGroup;
  additionalInfoForm : FormGroup;
  documentForm : FormGroup;
  accPreferForm : FormGroup;
  declarationForm : FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      title : ''
    });
    this.contactForm = this.fb.group({
      secondField : ''
    });

    this.additionalInfoForm = this.fb.group({
      thirdField : ''
    });

    this.documentForm = this.fb.group({
      fourthField : ''
    });

    this.accPreferForm = this.fb.group({
      fifthField : ''
    });

    this.declarationForm = this.fb.group({
      sixthField : ''
    });
  }

  onNext(stepper: MatStepper) {
    console.log(stepper);
    stepper.next();
  }

  onPrevious(stepper: MatStepper) {
    stepper.previous();
  }
}
