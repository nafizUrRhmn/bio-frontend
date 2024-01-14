import {MoveMoneyComponent} from "../private/operations/move-money/move-money.component";
import {ExternalMoveMoneyComponent} from "../private/operations/external-move-money/external-move-money.component";
import { BankTransfersComponent } from "../private/operations/bank-transfers/bank-transfers.component";

export class OperationsConstant {

  public static readonly OPERATIONS_COMPONENT_MAP: Map<string, any> = new Map([
    ['moveMoney', {
      obj: MoveMoneyComponent
    }],
    ['externalMoveMoney', {
      obj: ExternalMoveMoneyComponent
    }],
    ['bankTransfers', {
      obj: BankTransfersComponent
    }]
  ])
}
