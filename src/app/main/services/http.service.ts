import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private url: string;
    constructor(private _http: HttpClient) {
        this.url = environment.url;
    }
    get(tipo: string): Observable<any> {
        return this._http
            .get(this.url + tipo)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    getByid(tipo: string, id: any): Observable<any> {
        return this._http
            .get(this.url + tipo + '/' + id)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    getPaginado(tipo: string, obj): Observable<any> {
        let myParams = new HttpParams();
        if (obj.buscar !== undefined) {
            myParams = myParams.append('buscar', obj.buscar);
        }
        myParams = myParams.append('ordenar', obj.ordenar);
        myParams = myParams.append('pagina', obj.pagina);
        myParams = myParams.append('limite', obj.limite);
        return this._http
            .get(this.url + tipo, { params: myParams })
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    post(tipo: string, objeto: any): Observable<any> {
        return this._http
            .post(this.url + tipo, objeto)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    patch(tipo: string, id: any, objeto: any): Observable<any> {
        return this._http
            .patch(this.url + tipo + '/' + id, objeto)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    delete(tipo: string, id: any): Observable<any> {
        return this._http
            .delete(this.url + tipo + '/' + id)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
}
