import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import {AgbListComponent} from "./agb-list.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgGridModule,
    AgbListComponent
  ],
  exports:[
    AgbListComponent
  ]
})
export class AgbListModule { }
