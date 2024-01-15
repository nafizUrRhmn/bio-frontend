import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PocketStatementComponent } from '../pocket-statement/pocket-statement.component';

@Component({
  selector: 'app-panel-view',
  templateUrl: './panel-view.component.html',
  styleUrls: ['./panel-view.component.scss']
})
export class PanelViewComponent {

  fromDate: Date;
  toDate: Date;

  constructor(private dialog: MatDialog) {}
  openDialog() {
        this.dialog.open(PocketStatementComponent);
  }

}
