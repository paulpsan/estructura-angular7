import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class RespuestaInterceptor implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // Si queremos hacer algo con la respuesta, éste es el sitio.
                        //   console.log(event);
                    }
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        switch (err.status) {
                            case 404:
                                console.log('Página no encontrada!');
                                break;
                            default:
                                this.snackBar.open(err.status + '-' + err.statusText, '', {
                                    horizontalPosition: 'right',
                                    verticalPosition: 'top',
                                    panelClass: 'background-danger',
                                    duration: 15000
                                });
                                break;
                        }
                    }
                }
            )
        );
    }
}
