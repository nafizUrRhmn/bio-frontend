// Angular import
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationItem} from "./navigation-item";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../../_services";
import {MenuService} from "../../../../_services/menu.service";
import {AccessControlConstant} from "../../../../_constants/access-control.constant";
import {OperationsConstant} from "../../../../_constants/operations.constant";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  // public props
  hasInitialized = false;
  @Output() NavCollapsedMob = new EventEmitter();
  @Input() accessType;
  roles = [];
  navCollapsedMob = window.innerWidth;
  windowWidth: number;
  hashmap = new Map<string, Component>();
  path;
  navigationItems;
  superAdminNavigationItems: NavigationItem[];

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private menuService: MenuService) {
  }

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  ngOnInit(): void {

    this.route.url.subscribe(u => {
      this.path = u[0].path
      this.authService.user.subscribe(u => {
        const jwtBase64 = u.jwtToken.split('.')[1];
        const token = JSON.parse(atob(jwtBase64));
        this.roles = token.roles.split(',');
        console.log(this.roles);
        this.menuService.getMenusByModule(this.path).subscribe(v => {
          if (this.path === 'access-control' &&  u.modules.find(k => k === 'ACCESS_CONTROL')) {
            this.menuGenerator(v, AccessControlConstant.ACCESS_CONTROL_COMPONENT_MAP)
          } else if (this.path === 'operations' && u.modules.find(k => k === 'OPERATIONS')) {
            this.menuGenerator(v, OperationsConstant.OPERATIONS_COMPONENT_MAP)
          }
        });
      });
    });
  }


  menuGenerator(menuListObject, componentHasMap) {
    let layerZero = menuListObject?.layerZero;
    let layerOne = menuListObject?.layerOne;
    let layerTwo = menuListObject?.layerTwo;
    let navigation = [];
    for (let i = 0; i < layerZero.length; i++) {
      let objectLayerZero = layerZero[i];
      let objectsLayerOne: [] = layerOne.filter(u => u.parentId === objectLayerZero.id);
      let newObjectsLayerOne = [];
      for (let j = 0; j < objectsLayerOne.length; j++) {
        let objectLayerOne: any = objectsLayerOne[j];
        let objectsLayerTwo = layerTwo.filter(v => v.parentId === objectLayerOne.id).map(k => {
          return {...k, component: componentHasMap.get(k.component).obj}
        })
        objectLayerOne = {
          ...objectLayerOne,
          children: objectsLayerTwo
        }
        newObjectsLayerOne.push(objectLayerOne)
      }
      objectLayerZero = {
        ...objectLayerZero,
        children: newObjectsLayerOne
      }
      navigation.push(objectLayerZero);
    }
    console.log(navigation);
    this.superAdminNavigationItems = navigation;
    this.hasInitialized = true;
  }
}
