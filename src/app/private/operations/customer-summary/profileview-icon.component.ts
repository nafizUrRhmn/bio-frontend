import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Component } from '@angular/core';
import {PanelViewComponent} from "../customer-summary/panel-view/panel-view.component";
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'profileview-icon-component',
  template: ` <span><i (click)="iconClicked()" class="material-icons">accessibility</i></span>`
})
export class ProfileViewIconRenderer implements ICellRendererAngularComp {

  private cellValue!: string;

  constructor(public dialog: MatDialog){}

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  iconClicked() {
       const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = false;
       dialogConfig.height = "85%";
       dialogConfig.width = "100%";
       dialogConfig.position = {
            top : "90px",
            left : "300px"
       };
       this.dialog.open(PanelViewComponent,dialogConfig);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
