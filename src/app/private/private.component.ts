import {Component, ElementRef} from '@angular/core';
import { AuthenticationService } from '../_services';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  username: any;
  constructor(private authService: AuthenticationService,
    private translate: TranslateService) {
      let jwt ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZ2VudGJhbmsiLCJyb2xlcyI6IlJPTEVfU19BRE1JTixST0xFX1VTRVIiLCJpYXQiOjE3MDY2OTM0NTAsImV4cCI6MTcwNjY5Mzc1MH0.K-Qs88-2Ke0xe5gjzlpE8pbt_Cb4yq65YIzA19ND1ww";
      let encodedPayload = jwt.split('.')[1];
      let decodedPayload = window.atob(encodedPayload);
      let parsedPayload = JSON.parse(decodedPayload);
      this.username = parsedPayload.sub;
      console.log(this.username);
}

translateLanguageTo(lang: string) {
console.log(lang);
this.translate.use(lang);
}
onLogout(){
this.authService.logout();
}

}
