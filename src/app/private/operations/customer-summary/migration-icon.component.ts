import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import {MigrateOfferComponent} from "../customer-summary/migrate-offer/migrate-offer.component";
import { MatDialog , MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'migration-icon-component',
  template: `
    <span>
      <i (click)="iconClicked()" class="material-icons">airplanemode_active</i>
    </span>`
})
export class MigrationIconRenderer implements ICellRendererAngularComp {
  public cellValue!: string;

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
         this.dialog.open(MigrateOfferComponent,dialogConfig);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
