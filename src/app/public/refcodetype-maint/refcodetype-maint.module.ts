import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import { FooterModule } from "../../theme/shared/components/footer/footer.module";
import {RefCodeTypeMaintComponent} from "./refcodetype-maint.component";
import {TranslateModule} from "@ngx-translate/core";


const routes: Routes = [
  {
    path: '',
    component: RefCodeTypeMaintComponent
  },
];

@NgModule({
    declarations: [RefCodeTypeMaintComponent],
  imports: [
    CommonModule,
    FooterModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class RefcodetypeMaintModule { }
