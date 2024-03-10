import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import { ForgotPasswordComponent } from './forgot-password.component';
import { FooterModule } from "../../theme/shared/components/footer/footer.module";


const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  },
];

@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        CommonModule,
        FooterModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class ForgotPasswordModule { }
