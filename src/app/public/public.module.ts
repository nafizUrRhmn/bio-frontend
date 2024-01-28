import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'tab-prevention',
    loadChildren: () => import('./tab-prevention/tab-prevention.module').then((m) => m.TabPreventionModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class PublicModule {
}
