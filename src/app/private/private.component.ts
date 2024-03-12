import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from '../_services';
import noticeboardData from '../../../noticeboard-data.json';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthenticationService, private router: Router) {
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

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    window.location.reload();
  }

  routing(path) {
    this.router.navigate([path]).then(v => location.reload());
  }

}
