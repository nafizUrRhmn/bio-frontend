import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PrivateLayoutComponent} from "../theme/layout/private-layout/private-layout.component";
import {PrivateComponent} from "./private.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {WelcomeMessageModule} from "../theme/shared/components/welcome-message/welcome-message.module";
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatSelectModule} from "@angular/material/select";
import { HeaderModule } from "../theme/shared/components/header/header.module";

const routes: Routes = [
  {
    path: 'access-control',
    component: PrivateLayoutComponent,
    loadChildren: () => import('./access-control/access-control.module').then((m) => m.AccessControlModule)
  },
  {
    path: 'operations',
    component: PrivateLayoutComponent,
    loadChildren: () => import('./operations/operations.module').then((m) => m.OperationsModule)
  },
  {
    path: 'core-config',
    component: PrivateLayoutComponent,
    loadChildren: () => import('./core-config/core-config.module').then((m) => m.CoreConfigModule)
  },
  {
    path: 'change-password',
    component: PrivateLayoutComponent,
    loadChildren: () => import('./change-password/change-password.module').then((m) => m.ChangePasswordModule)
  }
];

@NgModule({
  declarations: [PrivateComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    WelcomeMessageModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSelectModule,
    HeaderModule
  ]
})
export class PrivateModule {
}
