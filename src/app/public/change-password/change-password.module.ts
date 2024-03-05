import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { RouterModule,Routes } from '@angular/router';
import { WelcomeMessageModule } from "../../theme/shared/components/welcome-message/welcome-message.module";
import { FooterModule } from "../../theme/shared/components/footer/footer.module";

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  },
];


@NgModule({
    declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WelcomeMessageModule,
    FooterModule,
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule { }
