import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormExampleComponent} from './reactive-form-example.component';
import {RouterModule, Routes} from '@angular/router';
import {NgApexchartsModule} from "ng-apexcharts";
import {BrowserModule} from "@angular/platform-browser";

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
    NgApexchartsModule,
]
})
export class ReactiveFormExampleModule { }
