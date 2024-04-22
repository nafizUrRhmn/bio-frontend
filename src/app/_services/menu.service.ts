import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class MenuService {
  public menu: Observable<any[]>;

  baseUrl = `${environment.apiUrl}/v1/menu`
  constructor(
    private router: Router,
    private http: HttpClient) {
  }
  getMenusByModule(modulePath,applId,langCode) {
    let params = new HttpParams();
    params = params.append('modulePath', modulePath);
    params = params.append('applId', applId);
    params = params.append('langCode', langCode);
    console.log(params);
    return this.http.get<any>(`${this.baseUrl}`,{params: params});
  }

  getMenusByLangCode(modulePath,langCode) {
    let params = new HttpParams();
    params = params.append('modulePath', modulePath);
    params = params.append('langCode', langCode);
    return this.http.get<any>(`${this.baseUrl}/get-by-langCode`,{params: params});
  }
}
