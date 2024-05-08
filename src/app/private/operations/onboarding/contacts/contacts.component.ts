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
      // PRESENT ADDRESS
      preAddressLine1: ['',Validators.required],
      preCountry: ['',Validators.required],
      preCityDistrict: ['',Validators.required],
      prePostCode: ['',Validators.required],
      preAddressVerified: ['',Validators.required],
      preMobile: ['',Validators.required],
      preFax: ['',Validators.required],
      preAddressLine2: ['',Validators.required],
      preDivision: ['',Validators.required],
      preUpazilaThana: ['',Validators.required],
      preNearestLandmark: ['',Validators.required],
      preAcHolderVerifiedAddress: ['',Validators.required],
      preEmail: ['',Validators.required],

      // PERMANENT ADDRESS
      perSameAsPresentAddress: ['',Validators.required],
      perAddressLine1: ['',Validators.required],
      perCountry: ['',Validators.required],
      perCityDistrict: ['',Validators.required],
      perPostCode: ['',Validators.required],
      perAddressVerified: ['',Validators.required],
      perMobile: ['',Validators.required],
      perFax: ['',Validators.required],
      perAddressLine2: ['',Validators.required],
      perDivision: ['',Validators.required],
      perUpazilaThana: ['',Validators.required],
      perNearestLandmark: ['',Validators.required],
      perAcHolderVerifiedAddress: ['',Validators.required],
      perEmail: ['',Validators.required],


      // WORK ADDRESS
      workSameAsPresentAddress: ['',Validators.required],
      workAddressLine1: ['',Validators.required],
      workCountry: ['',Validators.required],
      workCityDistrict: ['',Validators.required],
      workPostCode: ['',Validators.required],
      workAddressVerified: ['',Validators.required],
      workMobile: ['',Validators.required],
      workFax: ['',Validators.required],
      workAddressLine2: ['',Validators.required],
      workDivision: ['',Validators.required],
      workUpazilaThana: ['',Validators.required],
      workNearestLandmark: ['',Validators.required],
      workAcHolderVerifiedAddress: ['',Validators.required],
      workEmail: ['',Validators.required],

      // MAILING / COMMUNICATION ADDRESS
      mailingAddress: ['',Validators.required],

      // EMERGENCY CONTACT PERSON
      emergencyName: ['',Validators.required],
      emergencyRelationship: ['',Validators.required],
      emergencyEmail: ['',Validators.required],
      emergencyAddress: ['',Validators.required],
      emergencyMobile: ['',Validators.required]
    });
  }

  ngOnInit(){
    
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
