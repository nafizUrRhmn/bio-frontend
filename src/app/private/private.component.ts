import {Component, ElementRef} from '@angular/core';
import { AuthenticationService } from '../_services';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
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
