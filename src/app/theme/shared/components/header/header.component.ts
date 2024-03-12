import {Component, Input, ElementRef} from '@angular/core';
import {AuthenticationService} from 'src/app/_services';
import {TranslateService} from "@ngx-translate/core";
import {AccessControlConstant} from "../../../../_constants/access-control.constant";
import {OperationsConstant} from "../../../../_constants/operations.constant";


//noticeboardData

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username: any;
  isExpanded: boolean[] = [];

  languageArr = [
    {val: "en", name: "English"},
    {val: "bn", name: "Bangla"},
  ];

  selectedOpt: any = "";
  userLanguageCode :string = "ENG";


  constructor(private authService: AuthenticationService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(u => {
      console.log(u);
      const jwtBase64 = u.jwtToken.split('.')[1];
      const token = JSON.parse(atob(jwtBase64));
      this.userLanguageCode = token.prefLanguageCode;
    });
    // get logged in user data
    if (this.userLanguageCode === 'BAN') {
      this.selectedOpt = this.languageArr[1];
    } else {
      this.selectedOpt = this.languageArr[0];
    }
    this.translateLanguageTo(this.selectedOpt);
  }

  translateLanguageTo(selectedOpt: any) {
    this.translate.use(selectedOpt.val);
  }


  onLogout() {
    this.authService.logout();
  }

}
