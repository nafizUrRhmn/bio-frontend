import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule, Routes} from "@angular/router";
import {SessionRequestModalComponent} from './session-request-modal/session-request-modal.component';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from "@angular/forms";
import {PrivateComponent} from "../private/private.component";



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'tab-prevention',
    loadChildren: () => import('./tab-prevention/tab-prevention.module').then((m) => m.TabPreventionModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatDialogModule,
        MatIconModule,
        FormsModule,
    ],
  declarations: [
    SessionRequestModalComponent
  ],
  providers: [
    PrivateComponent
  ]
})
export class PublicModule {
}
