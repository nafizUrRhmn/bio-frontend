// Angular import
import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from "./navigation-item";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../_services";
import {MenuService} from "../../../../_services/menu.service";
import {AccessControlConstant} from "../../../../_constants/access-control.constant";
import {OperationsConstant} from "../../../../_constants/operations.constant";
import {take} from "rxjs";
import {ErrorCodeConstant} from "../../../../_constants/error-code.constant";
import {EventBusService} from "../../../../_services/event-bus.service";
import {EventNamesConstant} from "../../../../_constants/event-names.constant";
import {CoreConfigConstant} from "../../../../_constants/core-config.constant";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  // public props
  hasInitialized = false;
  @Input() accessType;
  roles = [];
  windowWidth: number;
  hashmap = new Map<string, Component>();
  path;
  superAdminNavigationItems: NavigationItem[];

  constructor(private route: ActivatedRoute,
              private authService: AuthenticationService,
              private menuService: MenuService,
              private router: Router,
              private eventBus: EventBusService) {
  }

  // public method

  ngOnInit(): void {
    this.route.url.subscribe(route => {
      this.path = route[0].path
      this.authService.user.subscribe(auth => {
        let moduleList = auth.modules.toString().split(',');
        const langObj$ = this.eventBus.getObservable(EventNamesConstant.LANGUAGE);
        if (this.path === 'access-control' && moduleList.find(k => k.split('!')[0] === 'ACCESS_CONTROL')) {
          let moduleValue = moduleList.find(k => k.split('!')[0] === 'ACCESS_CONTROL');
          langObj$.subscribe(lang => {
            this.menuService.getMenusByModule(this.path, moduleValue.split('!')[1], lang.langValue.code).pipe(take(1)).subscribe(menu => {
              this.menuGenerator(menu, AccessControlConstant.ACCESS_CONTROL_COMPONENT_MAP)
            });
          });

        } else if (this.path === 'operations' && moduleList.find(k => k === 'OPERATIONS')) {
          langObj$.subscribe(lang => {
            let moduleValue = auth.modules.find(k => k.split('!')[0] === 'OPERATIONS');
            this.menuService.getMenusByModule(this.path, moduleValue.split('!')[1], lang.langValue?.code)
              .pipe(take(1)).subscribe({
              next: (menu) => {
                this.menuGenerator(menu, OperationsConstant.OPERATIONS_COMPONENT_MAP);
              },
              error: (err) => {
                if (err.error.errorCode && err.error.errorCode === ErrorCodeConstant.PASSWORD_CHANGE_SCREEN_ERROR_CODE) {
                  this.router.navigate(['/private/change-password']);
                }
              }
            });
          });
        } else if (this.path === 'core-config' && moduleList.find(k => k.split('!')[0] === 'CCONF')) {
          langObj$.subscribe(lang => {
            let moduleValue = moduleList.find(k => k.split('!')[0] === 'CCONF');
            this.menuService.getMenusByModule(this.path, moduleValue.split('!')[1], lang.langValue.code)
              .pipe(take(1)).subscribe({
              next: (menu) => {
                this.menuGenerator(menu, CoreConfigConstant.CORE_CONFIG_COMPONENT_MAP)
              }, error: (err) => {
                if (err.error.errorCode && err.error.errorCode === ErrorCodeConstant.PASSWORD_CHANGE_SCREEN_ERROR_CODE) {
                  this.router.navigate(['/private/change-password']);
                }
              }
            });
          });
        }
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
          return {...k, component: componentHasMap.get(k.component)?.obj}
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
    this.superAdminNavigationItems = navigation;
    this.hasInitialized = true;
  }
}
