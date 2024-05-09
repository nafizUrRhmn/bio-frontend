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

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatExpansionModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, CommonModule],
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {


  // imageUrl: string = '';
  imageUrl: string = '../../../../../assets/images/empty-profile-pic.jpg';
  showDemoImage: boolean = true;
  uploadedFileName: string = '';

  panelOpenState = false;
  detailsForm: FormGroup;
  @Output() submitEvent = new EventEmitter<any>();
  @Output() previousEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private dialog: MatDialog) {
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
      mothername: ['', Validators.required],
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

    console.log(this.imageUrl);

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
}

