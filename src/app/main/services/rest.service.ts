import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestService {
    private url: string;
    constructor(private _http: HttpClient) {
        this.url = environment.url;
    }
    getUsers(obj?): Observable<any> {
        let myParams = new HttpParams();
        if (obj.buscar !== undefined) {
            myParams = myParams.append('buscar', obj.buscar);
        }
        myParams = myParams.append('ordenar', obj.ordenar);
        myParams = myParams.append('pagina', obj.pagina);
        myParams = myParams.append('limite', obj.limite);
        return this._http
            .get(this.url + 'usuarios', { params: myParams })
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    createUser(data: any): Observable<any> {
        return this._http
            .post(this.url + 'Users', data)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }

    loginUser(data: any): Observable<any> {
        return this._http
            .post(this.url + 'Users/login', data)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    
}
