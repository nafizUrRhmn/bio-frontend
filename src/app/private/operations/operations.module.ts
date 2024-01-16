import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OperationsComponent} from "./operations.component";
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
import {CommissionSummaryComponent} from "./commission-summary/commission-summary.component";
import {PocketStatementComponent} from "./customer-summary/pocket-statement/pocket-statement.component";
import {PanelViewComponent} from "./customer-summary/panel-view/panel-view.component";
import {TabsModule} from "../../theme/shared/components/tabs/tabs.module";
import { MatDialogModule } from '@angular/material/dialog';
import { BankTransfersComponent } from './bank-transfers/bank-transfers.component';
import { GenerateFacComponent } from './generate-fac/generate-fac.component';
import { AgGridModule } from 'ag-grid-angular';
import { FacCashWithdrawalComponent } from './faccash-withdrawal/faccash-withdrawal.component';
import { BalanceInquiryComponent } from './balance-inquiry/balance-inquiry.component';
import {CashDepositComponent} from "./cash-deposit/cash-deposit.component";
import {CashWithdrawalComponent} from "./cash-withdrawal/cash-withdrawal.component";
import {CashRefundComponent} from "./cash-refund/cash-refund.component";
import {LoanDisbursementComponent} from "./loan-disbursement/loan-disbursement.component";
import {LoanInstallmentComponent} from "./loan-installment/loan-installment.component";
import { RemittanceDisbursementComponent } from './remittance-disbursement/remittance-disbursement.component';
import {MigrateOfferComponent} from "./customer-summary/migrate-offer/migrate-offer.component";

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
    FacCashWithdrawalComponent,
    BankTransfersComponent,
    CommissionSummaryComponent,
    BalanceInquiryComponent,
    CashDepositComponent,
    CashWithdrawalComponent,
    CashRefundComponent,
    LoanDisbursementComponent,
    LoanInstallmentComponent,
    MigrateOfferComponent,
    RemittanceDisbursementComponent
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
    MatInputModule
  ],
})
export class OperationsModule {
}
