import {Component} from '@angular/core';
import {AuthenticationService} from '../_services';
import noticeboardData from '../../../noticeboard-data.json';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  username: any;
  notices: any[] = noticeboardData;
  isExpanded: boolean[] = [];
  maxLength: number = 120;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.isExpanded = new Array(this.notices.length).fill(false);
    this.authService.user.subscribe(u => {
      this.username = u?.fullName;
    });
  }

  toggleText(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

}
