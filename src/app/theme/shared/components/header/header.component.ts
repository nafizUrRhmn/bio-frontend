import {Component} from '@angular/core';
import {AuthenticationService} from 'src/app/_services';
import {TranslateService} from "@ngx-translate/core";
import {EventBusService} from "../../../../_services/event-bus.service";
import {EventNamesConstant} from "../../../../_constants/event-names.constant";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username: any;
  isExpanded: boolean[] = [];

  languageArr = [
    {val: "en",code:'ENG', name: "English"},
    {val: "bn",code:'BAN',name: "বাংলা"},
  ];

  prefLanguageCode: string = "ENG";
  path;
  selectedOpt: any = "";

  constructor(private authService: AuthenticationService,
              private translate: TranslateService,
              private eventBus: EventBusService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(u => {
      this.prefLanguageCode = u.prefLanguageCode;
      this.username = u.fullName;
    });
    // get logged in user data
    if (this.prefLanguageCode === 'BAN') {
      this.selectedOpt = this.languageArr[1];
    } else {
      this.selectedOpt = this.languageArr[0];
    }
    // console.log(this.selectedOpt);
    this.eventBus.publish({'name': EventNamesConstant.LANGUAGE, 'langValue': this.selectedOpt});
    this.translate.use(this.selectedOpt.val);
  }

  translateLanguageTo(selectedOpt: any) {
    this.eventBus.publish({'name': EventNamesConstant.LANGUAGE, 'langValue': this.selectedOpt});
    this.translate.use(selectedOpt.val);
  }

  onLogout() {
    this.authService.logout();
  }

}
