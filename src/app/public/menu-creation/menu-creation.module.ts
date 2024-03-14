import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCreationComponent } from './menu-creation.component';
import {RouterModule, Routes} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MenuCreationComponent
  },
];

@NgModule({
  declarations: [MenuCreationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
    
  ]
})
export class MenuCreationModule { }
