import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class MenuService {
  public menu: Observable<any[]>;

  baseUrl = `${environment.apiUrl}/v1/super-admin/menu`
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getMenusByModule(modulePath) {
    return this.http.get<any>(`${this.baseUrl}/${modulePath}`);
  }
}
