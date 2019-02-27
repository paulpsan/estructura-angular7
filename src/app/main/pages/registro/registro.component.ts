import { Component, OnDestroy, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { Subject } from "rxjs";
import { MatSnackBar, MatDatepickerInputEvent } from "@angular/material";
import { HttpService } from "app/main/services/http.service";
import { Router } from "@angular/router";
import { FileService } from "app/main/services/file.service";

@Component({
    selector: "app-registro",
    templateUrl: "./registro.component.html",
    styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit, OnDestroy {
    form: FormGroup;
    temasSociales;
    tematica;
    file;
    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;

    items = [
        { nombre: "Adaptaciones", campo: "Numero" },
        { nombre: "Tiempo de Licencia", campo: "Numero2" },
        { nombre: "prueba", campo: "Numero4" },
        { nombre: "prueba", campo: "Numero5" }
    ];
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _httpService: HttpService,
        private snackBar: MatSnackBar,
        private router: Router,
        private _fileService: FileService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Reactive Form
        this.form = new FormGroup({
            nombres: new FormControl("", Validators.required),
            apellidos: new FormControl("", Validators.required),
            rude: new FormControl("", Validators.required),
            fecha_nacimiento: new FormControl("", Validators.required),
            cie: new FormControl(""),
            unidad_educativa: new FormControl("", Validators.required),
            departamento: new FormControl("", Validators.required),
            distrito: new FormControl("", Validators.required),
            provincia: new FormControl("", Validators.required),
            domicilio: new FormControl("", Validators.required),
            edad: new FormControl(""),
            nivel: new FormControl(""),
            grado: new FormControl(""),
            temas_sociales: new FormControl("")
        });
        this.getTematica();
    }
    getTematica(): void {
        this._httpService.get(`tematicas`).subscribe(resp => {
            this.temasSociales = resp;
        });
    }
    selecTematica(event: any) {
        this.tematica = event.value;
    }
    cancelar() {
        this.tematica = null;
        this.form.reset();
    }
    selectFile(archivo: File) {
        if (!archivo) {
            this.file = null;
            return;
        }
        this.file = archivo;
        // const reader = new FileReader();
        // const urlImagenTemp = reader.readAsDataURL(archivo);
        // reader.onloadend = () => (this.file = reader.result);
        console.log(this.file);
    }
    register(): void {
        console.log("registro");
        // this._fileService
        //     .subirImagen(this.file, "proyectos", this.file)
        //     .then((resp: any) => {
        //         const objPatch = {
        //             avatar: resp.proyecto.avatar
        //         };
        //     });

        if (this.form.valid) {
            const dataPost = {
                nombres: this.form.controls["nombres"].value,
                apellidos: this.form.controls["apellidos"].value,
                rude: this.form.controls["rude"].value,
                fecha_nacimiento: this.form.controls["fecha_nacimiento"].value,
                cie: this.form.controls["cie"].value,
                unidad_educativa: this.form.controls["unidad_educativa"].value,
                departamento: this.form.controls["departamento"].value,
                distrito: this.form.controls["distrito"].value,
                provincia: this.form.controls["provincia"].value,
                domicilio: this.form.controls["domicilio"].value,
                edad: this.form.controls["edad"].value,
                nivel: this.form.controls["nivel"].value,
                grado: this.form.controls["grado"].value,
                temas_sociales: this.form.controls["temas_sociales"].value,
                fecha_creacion: new Date(),
                fecha_modificacion: new Date(),
                estado: "iniciado",
                usuario: ""
            };
            console.log(dataPost);
            this._httpService.post(`registros`, dataPost).subscribe(
                resp => {
                    this.snackBar.open("La Adición fue correcta", "", {
                        horizontalPosition: "right",
                        verticalPosition: "top",
                        panelClass: "background-success",
                        duration: 5000
                    });
                    this.form.reset();
                    this.router.navigateByUrl("/pages/listado");
                },
                err => {
                    this.snackBar.open(err.error.error.message, "", {
                        horizontalPosition: "right",
                        verticalPosition: "top",
                        panelClass: "background-warning",
                        duration: 5000
                    });
                    this.form.reset();
                }
            );
        }
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        const cumpleaños = new Date(event.value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - cumpleaños.getFullYear();
        let meses = hoy.getMonth() - cumpleaños.getMonth();
        if (
            meses < 0 ||
            (meses === 0 && hoy.getDate() < cumpleaños.getDate())
        ) {
            edad--;
        }
        this.form.controls["edad"].setValue(edad);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void {
        alert("You have finished the horizontal stepper!");
    }

    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void {
        alert("You have finished the vertical stepper!");
    }
}
