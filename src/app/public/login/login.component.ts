import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services";
import {first} from "rxjs";
import {JSEncrypt} from "jsencrypt";
import {environment} from "../../../environments/environment.prod";
import { MatDialog } from '@angular/material/dialog';
import { SessionRequestModalComponent } from '../session-request-modal/session-request-modal.component';
import {PrivateComponent} from "../../private/private.component";
import {LanguageService} from "../../_services/language.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  forceLoginFlg:boolean = false;
  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private authenticationService: AuthenticationService,
               public dialog: MatDialog,
               private privateComponent : PrivateComponent, private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.forceLoginFlg = false;
  }
  get f() { return this.loginForm.controls; }
  onSubmit(){
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(environment.publicKey);
    const encrypted = encrypt.encrypt(this.loginForm.get("password").value);
    this.loginForm.get("password").setValue(encrypted);

    console.log(this.loginForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log("force login flg set "+this.forceLoginFlg)
    this.authenticationService.login(this.loginForm.get('username').value,
                                     this.loginForm.get('password').value,
                                     this.forceLoginFlg)
      .pipe(first())
      .subscribe({
        next: (user) => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || `/private/super-admin`;
          console.log(returnUrl);
          this.router.navigate([returnUrl]);
        },
        error: err => {
          const errorCode = err && err.error && err.error.statusCode;
          const errorMsg = err && err.error && err.error.message;
          if(errorCode == "-1"){
            this.openDialog();
          }
          this.loading = false;
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SessionRequestModalComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((isChecked: boolean) => {
       this.forceLoginFlg = isChecked;
      this.loginForm.controls['password'].reset()
    });

  }
}
