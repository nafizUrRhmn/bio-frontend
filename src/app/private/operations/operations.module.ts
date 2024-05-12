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
import {MatDialogModule} from '@angular/material/dialog';
import {BankTransfersComponent} from './bank-transfers/bank-transfers.component';
import {GenerateFacComponent} from './generate-fac/generate-fac.component';
import {AgGridModule} from 'ag-grid-angular';
import {FacCashWithdrawalComponent} from './faccash-withdrawal/faccash-withdrawal.component';
import {BalanceInquiryComponent} from './balance-inquiry/balance-inquiry.component';
import {CashDepositComponent} from "./cash-deposit/cash-deposit.component";
import {CashWithdrawalComponent} from "./cash-withdrawal/cash-withdrawal.component";
import {CashRefundComponent} from "./cash-refund/cash-refund.component";
import {LoanDisbursementComponent} from "./loan-disbursement/loan-disbursement.component";
import {LoanInstallmentComponent} from "./loan-installment/loan-installment.component";
import {RemittanceDisbursementComponent} from './remittance-disbursement/remittance-disbursement.component';
import {MigrateOfferComponent} from "./customer-summary/migrate-offer/migrate-offer.component";
import {InsurancePremiumCollectionComponent} from './bill-pay/insurance-premium-collection/insurance-premium-collection.component';
import {CreditCardComponent} from './bill-pay/credit-card/credit-card.component';
import {InstitutionFeePaymentComponent} from './institution-fee-payment/institution-fee-payment.component';
import {MatRadioModule} from '@angular/material/radio';
import {DistributorBillCollectionsComponent} from './distributor-bill-collections/distributor-bill-collections.component';
import {RetailComponent} from './retail/retail.component';
import {CorporateComponent} from './corporate/corporate.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReportComponent} from './report/report.component';
import {OnboardingComponent} from "./onboarding/onboarding.component";
import {DetailsComponent} from "./onboarding/details/details.component";
import {ContactsComponent} from "./onboarding/contacts/contacts.component";
import {AdditionalInfoComponent} from "./onboarding/additional-info/additional-info.component";
import {DeclarationsComponent} from "./onboarding/declarations/declarations.component";
import {DocumentsComponent} from "./onboarding/documents/documents.component";
import {AccountPreferencesComponent} from "./onboarding/account-preferences/account-preferences.component";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";


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
    RemittanceDisbursementComponent,
    InsurancePremiumCollectionComponent,
    CreditCardComponent,
    RemittanceDisbursementComponent,
    InstitutionFeePaymentComponent,
    DistributorBillCollectionsComponent,
    RetailComponent,
    CorporateComponent,
    ReportComponent,
    OnboardingComponent
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
        MatRadioModule,
        TranslateModule,
        MatStepperModule,
        DetailsComponent,
        ContactsComponent,
        AdditionalInfoComponent,
        DeclarationsComponent,
        DocumentsComponent,
        AccountPreferencesComponent,
        MatButtonModule
    ],
})
export class OperationsModule {
}
