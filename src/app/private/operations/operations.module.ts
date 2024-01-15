import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OperationsComponent} from "./operations.component";
import {PrivateModule} from "../private.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../theme/shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {CommonModule} from "@angular/common";
import {MoveMoneyComponent} from "./move-money/move-money.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExternalMoveMoneyComponent} from "./external-move-money/external-move-money.component";
import {CustomerSummaryComponent} from "./customer-summary/customer-summary.component";
import {PocketStatementComponent} from "./pocket-statement/pocket-statement.component";
import {PanelViewComponent} from "./panel-view/panel-view.component";
import {TabsModule} from "../../theme/shared/components/tabs/tabs.module";
import { BankTransfersComponent } from './bank-transfers/bank-transfers.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { BankTransfersComponent } from './bank-transfers/bank-transfers.component';
import { GenerateFacComponent } from './generate-fac/generate-fac.component';
import { AgGridModule } from 'ag-grid-angular';
import { FacCashWithdrawalComponent } from './faccash-withdrawal/faccash-withdrawal.component';





const routes: Routes = [
  {
    path: '',
    component: OperationsComponent
  },
];

@NgModule({
  declarations: [
    OperationsComponent,
    MoveMoneyComponent,
    ExternalMoveMoneyComponent,
    CustomerSummaryComponent,
    PanelViewComponent,
    PocketStatementComponent,
    ExternalMoveMoneyComponent,
    BankTransfersComponent,
    GenerateFacComponent,
    FacCashWithdrawalComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TabsModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    AgGridModule,
    MatDialogModule,
    MatInputModule,
    MatDialogModule
  ],
})
export class OperationsModule {
}
