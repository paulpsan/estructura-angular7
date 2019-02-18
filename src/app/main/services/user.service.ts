import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    throwError as observableThrowError,
    Observable,
    BehaviorSubject
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url: string;
    private token: string;
    private usuario: BehaviorSubject<any> = new BehaviorSubject({});
    public usuario$: Observable<any> = this.usuario.asObservable();

    constructor(private _http: HttpClient, public router: Router) {
        this.url = environment.url;
        this.getCurrentUser().then(exists => {
            const usuario = exists;
            if (usuario) {
                this.usuario.next(usuario);
            }
        });
    }
    getCurrentUser(): Promise<any> {
        if (JSON.parse(localStorage.getItem('usuario')) == null) {
            return Promise.resolve(false);
        }
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem('usuario')));
        });
    }

    getUsers(): Observable<any> {
        let myParams = new HttpParams();
        const obj = { include: 'roles' };
        myParams = myParams.append('filter', JSON.stringify(obj));
        return this._http
            .get(this.url + 'usuarios', { params: myParams })
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    getUserById(id: String): Observable<any> {
        let myParams = new HttpParams();
        const obj = { include: 'roles' };
        myParams = myParams.append('filter', JSON.stringify(obj));
        return this._http
            .get(this.url + 'usuarios/' + id, { params: myParams })
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }

    createUser(data: any): Observable<any> {
        return this._http
            .post(this.url + 'usuarios', data)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }

    patchUser(data: any, id: any): Observable<any> {
        return this._http
            .patch(this.url + 'usuarios/' + id, data)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }

    patchRol(data: any, id: any,idRol: any): Observable<any> {
        return this._http
            .patch(this.url + 'usuarios/' + id, data)
            .pipe(
                catchError((error: any) =>
                    observableThrowError(error || 'Server error')
                )
            );
    }
    actualizarUsuario(usuario) {
        const urlApi = this.url + 'usuarios/' + usuario.id;
        return new Promise((resolve, reject) => {
            this._http.patch(urlApi, usuario).subscribe(
                usuarioPatch => {
                    localStorage.setItem(
                        'usuario',
                        JSON.stringify(usuarioPatch)
                    );
                    this.usuario.next(usuarioPatch);
                    resolve(true);
                },
                error => {
                    reject(observableThrowError(error));
                }
            );
        });
    }

    loginUser(data: any): Observable<any> {
        return this._http.post(this.url + 'usuarios/login', data).pipe(
            map((res: Response) => {
                console.log(res);
                localStorage.setItem('token', res['id']);
                let myParams = new HttpParams();
                let obj = { include: 'roles' };
                myParams = myParams.append('filter', JSON.stringify(obj));
                this._http
                    .get(this.url + 'usuarios/' + res['userId'], {
                        params: myParams
                    })
                    .subscribe(respuesta => {
                        console.log(respuesta);
                        localStorage.setItem(
                            'usuario',
                            JSON.stringify(respuesta)
                        );
                        this.usuario.next(respuesta);
                    });
            }),
            catchError((error: any) =>
                observableThrowError(error || 'Server error')
            )
        );
    }
    logout() {
        // this.usuario = null;
        this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(['/auth/login']);
    }
}
