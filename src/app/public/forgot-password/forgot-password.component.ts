import { Component ,OnInit,Input} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  //INPUT FIELD VARIABLES
  userIdValue: string ='';
  newPasswordValue: string ='';
  confirmPasswordValue: string ='';

  // OTP VARIABLES
  otpFieldValue1 : number;
  otpFieldValue2 : number;
  otpFieldValue3 : number;
  otpFieldValue4 : number;
  otpFieldValue5 : number;
  otpFieldValue6 : number;

  //OTP PORTION
  showTimer: boolean = false;
  showOtpPortion: boolean = false; 
  @Input() timer:number=60;
  remainingTime: number;
  timerInterval: any;
  showResendButton:boolean=false;

  
  //PASSWORD VISIBILITY VARIABLES
  password: string = '';
  confirmPassword: string = '';

  hideEyeIcon: boolean = false;
  hideConfirmEyeIcon: boolean = false;


  


  constructor(private fb : FormBuilder){
    this.forgotPasswordForm = this.fb.group({});
  }

  ngOnInit():void{
    this.forgotPasswordForm = this.fb.group({
      userId : ['',[Validators.required]],

      otpField1 : ['',[Validators.required]],
      otpField2 : ['',[Validators.required]],
      otpField3 : ['',[Validators.required]],
      otpField4 : ['',[Validators.required]],
      otpField5 : ['',[Validators.required]],
      otpField6 : ['',[Validators.required]],

      newPassword : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]],
    });
    
  }

  onRequest(){
    this.userIdValue = this.forgotPasswordForm.get('userId').value;
    // console.log(this.userIdValue);
    this.showOtpPortion = true;

    this.timerFunction();
    this.remainingTime = this.timer;
  }

  moveCursor(e:any,prev:any,curr:any,next:any){
    // console.log(e.key)
    var length = curr.value.length;
    var maxLength = curr.getAttribute('maxlength');
    if(length==maxLength){
      if(next != ""){
        next.focus();
      }
      
     
    }
    if(e.key=="Backspace"){
      if(prev != ""){
        prev.focus();
      }
    }
  }
  
  timerFunction(){
    this.remainingTime = this.timer;
    this.timerInterval= setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
 
 
  onResend(){
    this.showTimer = false;
    clearInterval(this.timerInterval);
    this.remainingTime = this.timer;
    this.timerFunction();

    this.forgotPasswordForm.get('otpField1')?.setValue(null);
    this.forgotPasswordForm.get('otpField2')?.setValue(null);
    this.forgotPasswordForm.get('otpField3')?.setValue(null);
    this.forgotPasswordForm.get('otpField4')?.setValue(null);
    this.forgotPasswordForm.get('otpField5')?.setValue(null);
    this.forgotPasswordForm.get('otpField6')?.setValue(null);

    this.otpFieldValue1 = this.forgotPasswordForm.get('otpField1')?.value;
    this.otpFieldValue2 = this.forgotPasswordForm.get('otpField2')?.value;
    this.otpFieldValue3 = this.forgotPasswordForm.get('otpField3')?.value;
    this.otpFieldValue4 = this.forgotPasswordForm.get('otpField4')?.value;
    this.otpFieldValue5 = this.forgotPasswordForm.get('otpField5')?.value;
    this.otpFieldValue6 = this.forgotPasswordForm.get('otpField6')?.value;
  }
  onSend(){
    this.otpFieldValue1 = this.forgotPasswordForm.get('otpField1').value;
    this.otpFieldValue2 = this.forgotPasswordForm.get('otpField2').value;
    this.otpFieldValue3 = this.forgotPasswordForm.get('otpField3').value;
    this.otpFieldValue4 = this.forgotPasswordForm.get('otpField4').value;
    this.otpFieldValue5 = this.forgotPasswordForm.get('otpField5').value;
    this.otpFieldValue6 = this.forgotPasswordForm.get('otpField6').value;


    this.newPasswordValue = this.forgotPasswordForm.get('newPassword').value;
    this.confirmPasswordValue = this.forgotPasswordForm.get('confirmPassword').value;

    console.log(
      this.otpFieldValue1,
      this.otpFieldValue2,
      this.otpFieldValue3,
      this.otpFieldValue4,
      this.otpFieldValue5,
      this.otpFieldValue6,
      
      this.newPasswordValue,
      this.confirmPasswordValue
      )
  }

  ////////////// PASSWORD VISIBILITY ////////////////

  togglePasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideEyeIcon = !this.hideEyeIcon;
    } 
  }
  toggleConfirmPasswordVisibility(event:MouseEvent):void { 
    if(event.button===0){
      this.hideConfirmEyeIcon = !this.hideConfirmEyeIcon;
    } 
  }


  hidePasswordEyeIcon():void{
    this.hideEyeIcon = false;
  }
  hideConfirmPasswordEyeIcon():void{
    this.hideConfirmEyeIcon = false;
  }


  showEyeIcon(): boolean {
    return this.password !== '';
  }
  showConfirmEyeIcon(): boolean {
    return this.confirmPassword !== '';
  }

 
}
