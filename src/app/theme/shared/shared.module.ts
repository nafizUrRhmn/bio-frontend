// Angular Imports
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// project import
import {CardModule} from './components';

import {SpinnerComponent} from './components/spinner/spinner.component';
import {NgScrollbarModule} from 'ngx-scrollbar';

// bootstrap import
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { WelcomeMessageModule } from './components/welcome-message/welcome-message.module';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    WelcomeMessageModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgbCollapseModule,
    NgScrollbarModule,
    HeaderModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    WelcomeMessageModule,
    SpinnerComponent,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbCollapseModule,
    NgScrollbarModule,
    HeaderModule
  ],
  declarations: [SpinnerComponent]
})
export class SharedModule {
}
