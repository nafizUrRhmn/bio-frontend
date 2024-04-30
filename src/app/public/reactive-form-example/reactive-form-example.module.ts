import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormExampleComponent} from './reactive-form-example.component';
import {RouterModule, Routes} from '@angular/router';
import {NgApexchartsModule} from "ng-apexcharts";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppModule} from "../../app.module";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {DirectiveModule} from "../../directives/upper-case.directive";

const routes: Routes = [
  {
    path: '',
    component: ReactiveFormExampleComponent
  },
];


@NgModule({
    declarations: [
      ReactiveFormExampleComponent
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DirectiveModule,
    MatInputModule
  ],
  providers: [MatDatepickerModule]
})
export class ReactiveFormExampleModule { }
