import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            url: `${req.url}?access_token=${localStorage.getItem('token')}`
        });

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((err: any, caught) => {
                if (err instanceof HttpErrorResponse) {
                    return observableThrowError(err);
                }
            })
        );
    }
}
