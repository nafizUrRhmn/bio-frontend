import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import {NrxGridComponent} from "./nrx-grid.component";

@NgModule({
  declarations: [NrxGridComponent],
  imports: [
    CommonModule,
    AgGridModule,
  ],
  exports: [
    NrxGridComponent,
  ]
})
export class NrxGridModule {
}
