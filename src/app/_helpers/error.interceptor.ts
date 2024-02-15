import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from "../_services";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
                            let errorResponse  = err.error;
                            let errorMsg = 'An unknown error occurred';
                            if (errorResponse instanceof ErrorEvent) {
                                console.log('This is client side error');
                                errorMsg = `Error: ${errorResponse.message}`;
                            } else {
                                console.log('This is server side error');
                                 if ([401, 403].includes(errorResponse.statusCode) && this.authenticationService.userValue) {
                                    // auto logout if 401 or 403 response returned from api
                                    this.authenticationService.logout();
                                 }
                                errorMsg = `Error Code: ${errorResponse.statusCode},  Message: ${errorResponse.message}`;
                            }
                            //const error = (err && err.error && err.error.message) || err.statusText;
                            return throwError(errorMsg);
                        })
                    )
            }
        /*return next.handle(request).pipe(catchError(err => {
            console.error("Tarin "+err);
            if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authenticationService.logout();
            }
            const error = (err && err.error && err.error.message) || err.statusText;
            return throwError(err);
        }))
    }*/
}
