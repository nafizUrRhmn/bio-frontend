// Angular import
import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';

// project import
import { NavigationItem } from '../navigation-item';
import {Tab} from "./tab.model";

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  // public props
  @Input() accessType;
  @Input() nav: NavigationItem[];
  // version
  currentApplicationVersion = environment.appVersion;

  windowWidth = window.innerWidth;
  tabs: Tab[] = [];
  // Constructor
  constructor(
    private zone: NgZone,
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
  }

  // Life cycle events
  ngOnInit() {
    if (this.windowWidth < 400) {
      (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
    }
  }

  fireOutClick() {

    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  onAdd(value: NavigationItem): void {
    if (this.tabs.find(u => u.title === value.title)) {
      return;
    }
    const tab: Tab = {
      id: value.id,
      title: value.title,
      component: value.component
    }
    this.tabs.push(tab);
  }
}
