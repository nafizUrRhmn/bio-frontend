import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AlertService } from "../../../_services/alert-service";
import { NavigationService } from "../../../theme/layout/private-layout/navigation/nav-content/navigation.service";
import {  take } from "rxjs";
import { FingerprintCaptureService } from './fingerprint-capture.service';

@Component({
  selector: 'app-fingerprint-capture',
  templateUrl: './fingerprint-capture.component.html',
  styleUrls: ['./fingerprint-capture.component.scss']
})
export class FingerprintCaptureComponent implements OnInit {

  nidForm: FormGroup;
  responseData: string | undefined;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    public dialog: MatDialog,
    private navService: NavigationService,
    private fingerprintCaptureService: FingerprintCaptureService
  ) { }

  ngOnInit() {
    this.nidForm = this.fb.group({
      nid: ['', [Validators.required,Validators.pattern(/^\d{10}$|^\d{17}$/)]],
      dob: ['', [Validators.required]]
    });
  }

  clearFormFields() {
    this.nidForm.reset();
  }

  onRegistration() {

    if (this.nidForm.invalid) {
      return;
    }

    const dobValue = this.nidForm.get('dob').value;

    const formattedDate = dobValue.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    console.log(formattedDate);

    console.log('Date of Birth:', dobValue);

    this.fingerprintCaptureService.fingerDataCapture()
      .pipe(take(1))
      .subscribe({
        next: response => {
          console.log(response);
          if (response.ResponseCode === 200) {
            this.responseData = response?.ResponseData;
            this.sendDataToServer();
          }
        
          else {
            this.errorMessage = `Error: ${response.ResponseData}`;
            this.alertService.errorAlert(this.errorMessage);
          }
        },
        error: error => {
          if(error.status===504){
            this.errorMessage = `Error:  The BBL Cap Service is not running`;
            this.alertService.errorAlert(this.errorMessage);
          }
          //console.log(error);
          this.errorMessage = `Error fetching data: ${error.message}`;
        },
      });
  }


  sendDataToServer() {
    if (this.responseData) {

      const blob = new Blob([this.responseData], { type: 'multipart/form-data' });

      const formData = new FormData();

      const menuId = this.navService.getMenuId();

      formData.append('fingerData', blob, 'fingerData.txt');

      formData.append('menuId', menuId);

      formData.append('nid', this.nidForm.get('nid').value);

      formData.append('dob', this.nidForm.get('dob').value);

      //console.log(formData);

      this.fingerprintCaptureService.submit(formData)
        .pipe(take(1)).subscribe({
          next: response => {
            console.log(response);
            this.alertService.successAlert(response)
              .then(() => this.nidForm.reset())
          },
          error: (err) => {
            this.alertService.errorAlert(err.error.message || 'An error occurred.');
          },
        });
    } else {
      this.errorMessage = 'Please fetch data first before sending.';
      this.alertService.errorAlert(this.errorMessage);
    }
  }

  get nid() {
    return this.nidForm.get('nid');
  }

  get dob() {
    return this.nidForm.get('dob');
  }

}
