// Angular import
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  private languageCode: String;

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
        console.log(auth)
        // auth.modules = auth.modules.length === 1 ? JSON.parse(auth.modules[0]) : auth.modules;
        const langObj$ = this.eventBus.getObservable(EventNamesConstant.LANGUAGE);
        if (this.path === 'access-control' && auth.modules.find(k => k === 'ACCESS_CONTROL')) {
          langObj$.subscribe(lang => {
            this.menuService.getMenusByModule(this.path, lang.langValue.code).pipe(take(1)).subscribe(menu => {
              this.menuGenerator(menu, AccessControlConstant.ACCESS_CONTROL_COMPONENT_MAP)
            });
          });

        } else if (this.path === 'operations' && auth.modules.find(k => k === 'OPERATIONS'))
          langObj$.subscribe(lang => {
            console.log(lang);
            console.log(this.path);
            this.menuService.getMenusByModule(this.path, lang.langValue?.code).pipe(take(1)).subscribe({
              next: (menu) => {
                console.log(menu);
                this.menuGenerator(menu, OperationsConstant.OPERATIONS_COMPONENT_MAP);
              },
              error: (err) => {
                console.log(err);
                if (err.error.errorCode && err.error.errorCode === ErrorCodeConstant.PASSWORD_CHANGE_SCREEN_ERROR_CODE) {
                  this.router.navigate(['/private/change-password']);
                }
              }
            });
          });
        // }
        // });
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
