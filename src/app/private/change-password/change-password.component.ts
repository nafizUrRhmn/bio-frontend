import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "../../_services/change-password.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../_services";
import {AlertService} from "../../_services/alert-service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  username: any;

  constructor(private changePasswordService: ChangePasswordService, private fb: FormBuilder,
              private alertService: AlertService,
              private http: HttpClient, private authService: AuthenticationService) {
    this.changePasswordForm = this.fb.group({
      loginKeyOld: ['', Validators.required],
      loginKeyNew: ['', Validators.required],
      loginKeyRe: ['', Validators.required]
    });
    this.authService.user.subscribe(u => {
      this.username = u?.fullName;
    });
  }


  onChangePassword(): void {
    console.log('hello');
    const formData = this.changePasswordForm.value;
    console.log(formData);
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      console.log(formData);
      let changePasswordObj = {
        'loginKeyOld' : formData.loginKeyOld,
        'loginKeyNew': formData.loginKeyNew,
        'loginKeyRe': formData.loginKeyRe
      }
      this.changePasswordService.changePassword(changePasswordObj).subscribe({
        next: (v) => this.alertService.successAlert("Password Change Successful"),
        error: (e) => this.alertService.errorAlert("Password Change Failed")
      }


    );
    }


    // if (this.resetPasswordForm.valid) {
    //   const formData = this.resetPasswordForm.value;
    //   this.changePasswordService.resetPassword(formData.oldPassword, formData.newPassword, formData.confirmPassword)
    //     .subscribe(
    //       response => {
    //         // Handle successful response
    //         console.log('Password reset successful:', response);
    //         // Add logic to navigate or display a success message
    //       },
    //       error => {
    //         // Handle error
    //         console.error('Error during password reset:', error);
    //         // Add logic to display an error message to the user
    //       }
    //     );
    // }




  }
}
