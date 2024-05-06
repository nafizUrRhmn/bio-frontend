import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BiomeRegComponent} from "./biome-reg.component";
import {TabsModule} from "../../theme/shared/components/tabs/tabs.module";
import { FingerprintCaptureComponent } from './fingerprint-capture/fingerprint-capture.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { BtnCellRendererModule } from 'src/app/shared/components/btn-grid/btn-cell-renderer.module';
import { NrxGridModule } from 'src/app/shared/components/nrx-grid/nrx-grid.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BiomeRegComponent
  },
];

@NgModule({
  declarations: [
    BiomeRegComponent,
    FingerprintCaptureComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    TabsModule,
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
export class BiomeRegModule {
}
