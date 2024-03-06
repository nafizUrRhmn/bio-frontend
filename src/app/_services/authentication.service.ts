import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from "../_models";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  public menu: Observable<any[]>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string,isForced:boolean) {
    return this.http.post<any>(`${environment.apiUrl}/v1/public/login`,
      {username, password,isForced}, {withCredentials: true})
      .pipe(map(user => {
        sessionStorage.setItem("refreshToken", user.refreshToken);
        sessionStorage.setItem("jwtToken", user.jwtToken);
        console.log(user);
        this.userSubject.next(user);
        this.startRefreshTokenTimer(user.jwtToken);
        return user;
      }));
  }

  logout() {
    this.http.post<any>(`${environment.apiUrl}/v1/user/revoke-token`, {refreshToken: sessionStorage.getItem('refreshToken')}, {withCredentials: true}).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("jwtToken");
    this.router.navigate(['/public/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/v1/user/refresh-token`, {refreshToken: sessionStorage.getItem('refreshToken')}, {withCredentials: true})
      .pipe(map((user) => {
        sessionStorage.setItem("jwtToken", user.jwtToken);
        this.userSubject.next(user);
        this.startRefreshTokenTimer(user.jwtToken);
        return user;
      }));
  }

  // helper methods

  private refreshTokenTimeout?: any;

  updateJwt(jwtToken) {
    const jwtBase64 = jwtToken.split('.')[1];
    jwtToken = JSON.parse(atob(jwtBase64));
    if (jwtToken.exp - Date.now() <= 0) {
      this.refreshToken()
    }
  }

  private startRefreshTokenTimer(jwtToken) {
    const jwtBase64 = jwtToken!.split('.')[1];
    const jwtTokenObj = JSON.parse(atob(jwtBase64));
    let timeout = jwtTokenObj.exp - Date.now() / 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), (timeout - 60) * 1000);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
