import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoreConfigComponent} from "./core-config.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../theme/shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabsModule} from "../../theme/shared/components/tabs/tabs.module";
import {MatDialogModule} from '@angular/material/dialog';
import {AgGridModule} from 'ag-grid-angular';
import {MatRadioModule} from '@angular/material/radio';
import {TranslateModule} from "@ngx-translate/core";
import {RefCodeTypeMaintComponent} from "./refcodetype-maint/refcodetype-maint.component";
import {MatStepperModule} from "@angular/material/stepper";
import {RefCodeMaintComponent} from "./refcode-maint/refcode-maint.component";
import {MenuMaintenanceComponent} from "./menu-maintenance/menu-maintenance.component";
import {NrxGridModule} from "../../shared/components/nrx-grid/nrx-grid.module";
import {BtnCellRendererModule} from "../../shared/components/btn-grid/btn-cell-renderer.module";
import { MessageIdMaintComponent } from './message-id-maint/message-id-maint.component';


const routes: Routes = [
  {
    path: '',
    component: CoreConfigComponent
  },
];

@NgModule({
  declarations: [
    CoreConfigComponent,
    RefCodeTypeMaintComponent,
    RefCodeMaintComponent,
    MenuMaintenanceComponent,
    MessageIdMaintComponent
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
    NrxGridModule,
    BtnCellRendererModule
  ],
})
export class CoreConfigModule {
}
