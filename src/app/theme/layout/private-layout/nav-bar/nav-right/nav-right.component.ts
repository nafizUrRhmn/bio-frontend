// Angular import
import { Component } from '@angular/core';
import {AuthenticationService} from "../../../../../_services";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  constructor(private authService: AuthenticationService,
              private translate: TranslateService) {
  }

  translateLanguageTo(lang: string) {
    console.log(lang);
    this.translate.use(lang);
  }
  onLogout(){
    this.authService.logout();
  }
}
