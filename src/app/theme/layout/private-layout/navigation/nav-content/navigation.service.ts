import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {functionCodeNameConstant} from "../../../../../_constants/function-code-name.constant";


@Injectable({providedIn: "root"})
export class NavigationService{

  private _getMenuEvent$ = new BehaviorSubject<any>([]);
  get getMenuEvent$(): BehaviorSubject<any> {
    return this._getMenuEvent$;
  }
  //
  // set setMenuEvent$(value: BehaviorSubject<any>) {
  //   this._getMenuEvent$ = value;
  // }

  getPermittedOptions(){
    let permiOptionArray = [];
    let splittedArr = this.getMenuEvent$.value.optionPermission.split(",");
    for(let i=0; i<splittedArr.length; i++){
      let obj = {}
      const optionValue = splittedArr[i].split('-')[0];
      obj["optionValue"] = optionValue;
      obj["optionText"] = functionCodeNameConstant[optionValue];
      permiOptionArray.push(obj);
    }
    return permiOptionArray;
  }
}
