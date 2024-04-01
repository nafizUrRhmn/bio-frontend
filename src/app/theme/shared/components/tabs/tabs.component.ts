import { AlertService } from './../../../../_services/alert-service';
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { NavigationItem } from "../../../layout/private-layout/navigation/navigation-item";
import { NavigationService } from "../../../layout/private-layout/navigation/nav-content/navigation.service";
import { EventBusService } from 'src/app/_services/event-bus.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @ViewChild(MatTabGroup, { read: MatTabGroup })
  tabGroup!: MatTabGroup;
  @ViewChildren(MatTab, { read: MatTab })
  tabNodes!: QueryList<MatTab>;
  closedTabs: number[] = [];
  tabs: NavigationItem[] = [];
  @Input() initialized;
  constructor(
    private navigationService: NavigationService,
    private alertService: AlertService,
    private eventBus: EventBusService
    ) {
    console.log(this.tabs.splice(0, 1));
    this.closedTabs = [];
    this.navigationService.getMenuEvent$.asObservable().subscribe(u => {
      if (this.tabs) {
        const existingTabIndex = this.tabs.findIndex(v => v.title === u.title);
        if (existingTabIndex !== -1) {
          this.tabGroup.selectedIndex = existingTabIndex;
          return;
        }
        if (this.tabs.length >= 3) {
          this.alertService.warningAlert("You can not add more than three tabs");
          return;
        }
        if (u !== null && u.title) {
          this.tabs.push(u);
          this.tabGroup.selectedIndex = this.tabs.length - 1;
        }
      }

    });
    this.eventBus.getObservable('closeAllTabs').subscribe(() => {
      this.closeAllTabs();
    });
  }

  closeTab(event: any, index: number) {
    event.stopPropagation();
    this.closedTabs.push(index);
    this.tabGroup.selectedIndex = this.tabNodes.length - 1;
    this.tabs.splice(index, 1);
  }

  closeAllTabs() {
    this.tabs = [];
    this.closedTabs = [];
    this.tabGroup.selectedIndex = -1;
  }
}
