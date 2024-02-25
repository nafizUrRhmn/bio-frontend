import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule,Routes } from '@angular/router';
import { WelcomeMessageModule } from "../../theme/shared/components/welcome-message/welcome-message.module";
import { FooterModule } from "../../theme/shared/components/footer/footer.module";

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  },
];


@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        WelcomeMessageModule,
        FooterModule
    ]
})
export class ResetPasswordModule { }
