import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { OnboardingConstant } from "../onboarding.constant";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TakePictureDialogComponent } from '../take-picture-dialog/take-picture-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DetailsService } from './details.service';
import { take } from 'rxjs';
import { AlertService } from 'src/app/_services/alert-service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatExpansionModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, CommonModule],
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {

  imageUrl: string = '../../../../../assets/images/empty-profile-pic.jpg';
  showDemoImage: boolean = true;
  uploadedFileName: string = '';

  panelOpenState = false;
  detailsForm: FormGroup;
  @Output() submitEvent = new EventEmitter<any>();
  @Output() previousEvent = new EventEmitter<any>();
  
  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private detailsService: DetailsService, private alertService: AlertService) {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      title: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      relationWithAccount: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      dob: ['', Validators.required],
      passport: ['', Validators.required],
      documentType: ['', Validators.required],
      documentId: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      nationality: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      residenceStatus: ['', Validators.required],
      religion: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.detailsForm.value);
    const payload = { 'payload': this.detailsForm.value, 'formName': OnboardingConstant.DETAILS_FORM }
    const payloadToApi = {...this.detailsForm.value,};
    console.log(payload);
    this.detailsService.submit(payloadToApi).pipe(take(1)).subscribe({
      next: (v) =>
        this.alertService.successAlert(v.responseMessage)
          .then(() => {
           
          }),
      error: (err) => {
        this.alertService.errorAlert(err.error.message);
      }
    });
    this.submitEvent.emit(payload);
  }

  previous(): void {
    const payload = { 'currentForm': OnboardingConstant.DETAILS_FORM }
    this.previousEvent.emit(payload);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.showDemoImage = false;
      this.uploadedFileName = file.name;
    };

    //console.log(this.imageUrl);

    reader.readAsDataURL(file);
  }

  openTakePictureDialog() {

    const dialogRef = this.dialog.open(TakePictureDialogComponent, {
      width: '50%',
      height: '50%',
      data: {
        title: 'Take Picture',
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Hi");
      if (result) {
        console.log("image data " + result);
        this.imageUrl = result;
      }
    });
  }

  get firstName() {
    return this.detailsForm.get('firstName');
  }
  
  get title() {
    return this.detailsForm.get('title');
  }
  
  get middleName() {
    return this.detailsForm.get('middleName');
  }
  
  get lastName() {
    return this.detailsForm.get('lastName');
  }
  
  get relationWithAccount() {
    return this.detailsForm.get('relationWithAccount');
  }
  
  get placeOfBirth() {
    return this.detailsForm.get('placeOfBirth');
  }
  
  get dob() {
    return this.detailsForm.get('dob');
  }
  
  get passport() {
    return this.detailsForm.get('passport');
  }
  
  get documentType() {
    return this.detailsForm.get('documentType');
  }
  
  get documentId() {
    return this.detailsForm.get('documentId');
  }
  
  get mobile() {
    return this.detailsForm.get('mobile');
  }
  
  get email() {
    return this.detailsForm.get('email');
  }
  
  get fatherName() {
    return this.detailsForm.get('fatherName');
  }
  
  get motherName() {
    return this.detailsForm.get('motherName');
  }
  
  get nationality() {
    return this.detailsForm.get('nationality');
  }
  
  get maritalStatus() {
    return this.detailsForm.get('maritalStatus');
  }
  
  get residenceStatus() {
    return this.detailsForm.get('residenceStatus');
  }
  
  get religion() {
    return this.detailsForm.get('religion');
  }
  
  get gender() {
    return this.detailsForm.get('gender');
  }
  


}

