import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../_models";

@Injectable({providedIn: 'root'})
export class LanguageService{

  public languageSub: BehaviorSubject<string> = new BehaviorSubject<string>(null);

}
