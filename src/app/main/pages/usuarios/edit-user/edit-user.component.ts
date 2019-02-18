import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'app/main/services/http.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/main/services/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    form: FormGroup;
    usuario;
    roles;
    rolSelect;
    id;
    constructor(
        private _httpService: HttpService,
        private _userService: UserService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.getRoles();

        this.form = new FormGroup({
            nombre: new FormControl('', Validators.required),
            apellido: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            estado: new FormControl('', Validators.required),
            rol: new FormControl('', Validators.required)
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._userService.getUserById(this.id).subscribe((resp: any) => {
                this.usuario = resp;
                this.setValueUsers();
            });
        });
    }
    setValueUsers() {
        console.log(this.usuario);
        this.form.setValue({
            nombre: this.usuario.nombre || '',
            apellido: this.usuario.apellido || '',
            username: this.usuario.username,
            email: this.usuario.email,
            estado: this.usuario.estado || '',
            rol: this.usuario.roles[0].id
        });
    }

    getRoles() {
        this._httpService.get(`roles`).subscribe(resp => {
            this.roles = resp;
        });
    }
    change(event) {
        this.rolSelect = event.value;
    }
    save() {
        const user = {
            nombre: this.form.controls['nombre'].value,
            apellido: this.form.controls['apellido'].value,
            username: this.form.controls['username'].value,
            email: this.form.controls['email'].value,
            estado: this.form.controls['estado'].value
        };
        console.log(user);

        this._userService.patchUser(user, this.id).subscribe(
            data => {
                console.log(data);
                this.form.reset();
                this.snackBar.open('Usuario Actualizado exitosamente!!', '', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'background-success',
                    duration: 3000
                });
                this.router.navigate(['pages/usuarios']);
            },
            err => {
                this.snackBar.open(err.error.error.message, '', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'background-danger',
                    duration: 5000
                });
            }
        );
        if(this.rolSelect){
            this._userService.patchRol(user, this.id,this.rolSelect).subscribe(
                data => {
                    console.log(data);
                    this.snackBar.open('Usuario Actualizado exitosamente!!', '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-success',
                        duration: 3000
                    });
                    this.router.navigate(['pages/usuarios']);
                },
                err => {
                    this.snackBar.open(err.error.error.message, '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-danger',
                        duration: 5000
                    });
                }
            );
        }
    }
    cancel() {
        this.router.navigateByUrl('/pages/usuarios');
    }
}
