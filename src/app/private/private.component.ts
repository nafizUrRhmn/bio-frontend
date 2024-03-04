import {Component,Input, ElementRef} from '@angular/core';
import {AuthenticationService} from '../_services';
import {TranslateService} from "@ngx-translate/core";
import noticeboardData from '../../../noticeboard-data.json';
import {LanguageService} from "../_services/language.service";
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  username: any;
  prefLangCode: any;
  notices:any[]=noticeboardData;
  isExpanded: boolean[] = [];
  maxLength: number = 120;
  languageArr = [
    {val: "en", name: "English"},
    {val: "bn", name: "Bangla"},
  ];

  selectedOpt :any = "";

  constructor(private authService: AuthenticationService,
    private translate: TranslateService, private langService: LanguageService) {
}
ngOnInit() {
  this.isExpanded = new Array(this.notices.length).fill(false);
  this.authService.user.subscribe(u => {
    this.username = u?.fullName;
    this.prefLangCode = u?.prefLangCode;
  });
  this.langService.languageSub.subscribe(u => {
    console.log(u);
    if(u === 'BAN'){
      this.selectedOpt = this.languageArr[1];
    }else{
      this.selectedOpt = this.languageArr[0];
    }
    this.translateLanguageTo(this.selectedOpt);
  })


}

  translateLanguageTo(selectedOpt: any) {
    this.translate.use(selectedOpt.val);
}

onLogout(){
this.authService.logout();
}


toggleText(index: number): void {
  this.isExpanded[index] = !this.isExpanded[index];
}

}
