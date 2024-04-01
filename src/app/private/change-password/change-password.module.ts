import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password.component';
import {RouterLink, RouterModule, Routes} from '@angular/router';
import {WelcomeMessageModule} from "../../theme/shared/components/welcome-message/welcome-message.module";
import {FooterModule} from "../../theme/shared/components/footer/footer.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  },
];


@NgModule({
    declarations: [
      ChangePasswordComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WelcomeMessageModule,
    FooterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class ChangePasswordModule { }
