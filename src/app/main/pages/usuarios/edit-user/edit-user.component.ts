import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpService } from "app/main/services/http.service";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
    form: FormGroup;
    usuario;
    roles;
    id;
    constructor(
        private _httpService: HttpService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        // this.getRoles();

        this.form = new FormGroup({
            nombres: new FormControl("", Validators.required),
            apellidos: new FormControl("", Validators.required),
            login: new FormControl("", Validators.required),
            correo: new FormControl("", Validators.required),
            estado: new FormControl("", Validators.required),
            rol: new FormControl("", Validators.required)
        });

        this.route.params.subscribe(params => {
            this.id = params["id"];
            this._httpService
                .getByid("Users", this.id)
                .subscribe((resp: any) => {
                    this.usuario = resp;
                    this.setValueUsers();
                });
        });
    }
    setValueUsers() {
        this.form.setValue({
            nombres: this.usuario.nombres,
            apellidos: this.usuario.apellidos,
            login: this.usuario.login,
            correo: this.usuario.correo,
            estado: this.usuario.estado,
            rol: this.usuario.rol
        });
    }

    getRoles() {
        this._httpService.get(`roles`).subscribe(resp => {
            this.roles.resp;
        });
    }
    cancel() {
        this.router.navigateByUrl("/pages/usuaros");
    }
}
