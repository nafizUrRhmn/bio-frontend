import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "../../_services/change-password.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../_services";
import {AlertService} from "../../_services/alert-service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  username: any;

  //PASSWORD VISIBILITY VARIABLES
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  hideOldEyeIcon: boolean = false;
  hideNewEyeIcon: boolean = false;
  hideConfirmEyeIcon: boolean = false;

  constructor(private changePasswordService: ChangePasswordService, private fb: FormBuilder,
              private alertService: AlertService, private router: Router,
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
        next: (v) => this.alertService.successAlert("Password Change Successful")
          .then(() => this.router.navigate(['/'])),
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

  ////////////// PASSWORD VISIBILITY ////////////////

  toggleOldPasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideOldEyeIcon = !this.hideOldEyeIcon;
    } 
  }
  toggleNewPasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideNewEyeIcon = !this.hideNewEyeIcon;
    } 
  }
  toggleConfirmPasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideConfirmEyeIcon = !this.hideConfirmEyeIcon;
    } 
  }


  hideOldPasswordEyeIcon():void{
    this.hideOldEyeIcon = false;
  }
  hideNewPasswordEyeIcon():void{
    this.hideNewEyeIcon = false;
  }
  hideConfirmPasswordEyeIcon():void{
    this.hideConfirmEyeIcon = false;
  }


  showOldEyeIcon(): boolean {
    return this.oldPassword !== '';
  }
  showNewEyeIcon(): boolean {
    return this.newPassword !== '';
  }
  showConfirmEyeIcon(): boolean {
    return this.confirmPassword !== '';
  }

}
