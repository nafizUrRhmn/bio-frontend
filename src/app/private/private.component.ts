import {Component,Input, ElementRef} from '@angular/core';
import { AuthenticationService } from '../_services';
import {TranslateService} from "@ngx-translate/core";
import noticeboardData from '../../../noticeboard-data.json'
@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  username: any;

  notices:any[]=noticeboardData;
  truncatedText: string = '';
  isExpanded: boolean[] = [];
  maxLength: number = 120;

  
  constructor(private authService: AuthenticationService,
    private translate: TranslateService) {
}

translateLanguageTo(lang: string) {
this.translate.use(lang);
}


ngOnInit() {
  this.isExpanded = new Array(this.notices.length).fill(false);
}



onLogout(){
this.authService.logout();
}


toggleText(index: number): void {
  this.isExpanded[index] = !this.isExpanded[index];
}




}
