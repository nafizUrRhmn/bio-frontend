import {MoveMoneyComponent} from "../private/operations/move-money/move-money.component";
import {ExternalMoveMoneyComponent} from "../private/operations/external-move-money/external-move-money.component";
import {CustomerSummaryComponent} from "../private/operations/customer-summary/customer-summary.component";
import {BankTransfersComponent} from "../private/operations/bank-transfers/bank-transfers.component";
import {GenerateFacComponent} from "../private/operations/generate-fac/generate-fac.component";
import {FacCashWithdrawalComponent} from "../private/operations/faccash-withdrawal/faccash-withdrawal.component";
import {CommissionSummaryComponent} from "../private/operations/commission-summary/commission-summary.component";
import {BalanceInquiryComponent} from "../private/operations/balance-inquiry/balance-inquiry.component";
import {CashDepositComponent} from "../private/operations/cash-deposit/cash-deposit.component";
import {CashWithdrawalComponent} from "../private/operations/cash-withdrawal/cash-withdrawal.component";
import {CashRefundComponent} from "../private/operations/cash-refund/cash-refund.component";
import {LoanDisbursementComponent} from "../private/operations/loan-disbursement/loan-disbursement.component";
import {LoanInstallmentComponent} from "../private/operations/loan-installment/loan-installment.component";
import { RemittanceDisbursementComponent } from "../private/operations/remittance-disbursement/remittance-disbursement.component";
import { InsurancePremiumCollectionComponent } from "../private/operations/bill-pay/insurance-premium-collection/insurance-premium-collection.component";
import { CreditCardComponent } from "../private/operations/bill-pay/credit-card/credit-card.component";
import {InstitutionFeePaymentComponent} from "../private/operations/institution-fee-payment/institution-fee-payment.component";
import { DistributorBillCollectionsComponent } from "../private/operations/distributor-bill-collections/distributor-bill-collections.component";
import { RetailComponent } from "../private/operations/retail/retail.component";
import { CorporateComponent } from "../private/operations/corporate/corporate.component";

export class OperationsConstant {

  public static readonly OPERATIONS_COMPONENT_MAP: Map<string, any> = new Map([
    ['moveMoney', {
      obj: MoveMoneyComponent
    }],
    ['externalMoveMoney', {
      obj: ExternalMoveMoneyComponent
    }],
    ['customerSummary', {
      obj: CustomerSummaryComponent
    }],
    ['commissionSummary', {
      obj: CommissionSummaryComponent
    }],
    ['bankTransfers', {
      obj: BankTransfersComponent
    }],
    ['generateFac', {
      obj: GenerateFacComponent
    }],
    ['facCashWithdrawal', {
      obj: FacCashWithdrawalComponent
    }],
    ['balanceInquiry', {
      obj: BalanceInquiryComponent
    }],
    ['cashDeposit', {
      obj: CashDepositComponent
    }],
    ['cashWithdrawal', {
      obj: CashWithdrawalComponent
    }],
    ['cashRefund', {
      obj: CashRefundComponent
    }],
    ['loanInstallment', {
      obj: LoanInstallmentComponent
    }],
    ['loanDisbursement', {
      obj: LoanInstallmentComponent
    }],
    ['remittanceDisbursement', {
      obj: RemittanceDisbursementComponent
    }],
    ['insurancePremiumCollection', {
      obj: InsurancePremiumCollectionComponent
    }],
    ['creditCard', {
      obj: CreditCardComponent
    }],
    ['institutionFeePayment', {
      obj: InstitutionFeePaymentComponent
    }],
    ['distributorBillCollections', {
      obj: DistributorBillCollectionsComponent
    }],
    ['retail', {
      obj: RetailComponent
    }],
    ['corporate', {
      obj: CorporateComponent
    }],
  ])
}
