import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from "../_services";
import {AlertService} from "../_services/alert-service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.error(err);
            if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authenticationService.logout();
            }

            if([401, 403].includes(err.status)){
              this.alertService.errorAlert(err.error, err.statusText);
            }
            else if([500,504].includes(err.status)){
              this.alertService.errorAlert(err.error, err.statusText);
            }
            else if([404].includes(err.status)){
              this.alertService.errorAlert(err.error, err.statusText);
            }
            return throwError(err);
        }))
    }
}
