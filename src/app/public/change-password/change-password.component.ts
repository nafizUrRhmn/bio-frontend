import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "../../_services/change-password.service";
import {WelcomeMessageModule} from "../../theme/shared/components/welcome-message/welcome-message.module";
import {RouterLink} from "@angular/router";
import {FooterModule} from "../../theme/shared/components/footer/footer.module";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../_services";
import {SharedModule} from "../../theme/shared/shared.module";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone: true,
  imports: [
    WelcomeMessageModule,
    RouterLink,
    FooterModule,
    SharedModule
  ],
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  username: any;

  constructor(private changePasswordService: ChangePasswordService, private fb: FormBuilder, private http: HttpClient, private authService: AuthenticationService) {
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
      this.changePasswordService.changePassword(changePasswordObj).subscribe(u => console.log(u));
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
