import { Component ,OnInit,Input} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  userIdValue: string ='';

  // OTP VARIABLES
  otpFieldValue1 : string = '';
  otpFieldValue2 : string = '';
  otpFieldValue3 : string = '';
  otpFieldValue4 : string = '';
  otpFieldValue5 : string = '';
  otpFieldValue6 : string = '';

  showTimer: boolean = false;
  showOtpPortion: boolean = false; 
  @Input() timer:number=30;
  remainingTime: number;
  timerInterval: any;
  showResendButton:boolean=false;

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
 
  onSubmit(){
    this.userIdValue = this.forgotPasswordForm.get('userId').value;
    console.log(this.userIdValue);
  }
  onResend(){
    this.showTimer = false;
    clearInterval(this.timerInterval);
    this.remainingTime = this.timer;
    this.timerFunction();
  }
  onVerify(){
    this.otpFieldValue1 = this.forgotPasswordForm.get('otpField1').value;
    this.otpFieldValue2 = this.forgotPasswordForm.get('otpField2').value;
    this.otpFieldValue3 = this.forgotPasswordForm.get('otpField3').value;
    this.otpFieldValue4 = this.forgotPasswordForm.get('otpField4').value;
    this.otpFieldValue5 = this.forgotPasswordForm.get('otpField5').value;
    this.otpFieldValue6 = this.forgotPasswordForm.get('otpField6').value;

    console.log(
      this.otpFieldValue1,
      this.otpFieldValue2,
      this.otpFieldValue3,
      this.otpFieldValue4,
      this.otpFieldValue5,
      this.otpFieldValue6)
  }

 
}
