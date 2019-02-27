import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './user.service';
import { HttpService } from './http.service';
import { AuthInterceptor } from './auth.interceptor';
import { RespuestaInterceptor } from './respuesta.interceptor';
import { MatSnackBarModule } from '@angular/material';
import { FileService } from './file.service';

@NgModule({
    declarations: [],

    imports: [CommonModule, HttpClientModule, MatSnackBarModule],
    providers: [
        UserService,
        HttpService,
        FileService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RespuestaInterceptor,
            multi: true
        }
    ]
})
export class ServicesModule {}
