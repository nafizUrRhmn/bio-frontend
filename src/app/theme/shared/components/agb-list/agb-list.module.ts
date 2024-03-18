import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AgbListComponent } from './agb-list.component';


@NgModule({
  declarations: [AgbListComponent],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports:[
    AgbListComponent
  ]
})
export class AgbListModule { }
