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
import {TabsModule} from "../../theme/shared/components/tabs/tabs.module";
import { BankTransfersComponent } from './bank-transfers/bank-transfers.component';


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
    BankTransfersComponent
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
  ],
})
export class OperationsModule {
}
