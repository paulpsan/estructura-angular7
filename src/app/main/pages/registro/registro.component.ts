import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'app/main/services/http.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy {
    form: FormGroup;
    temasSociales;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;

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
        private snackBar: MatSnackBar
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
            nombres: new FormControl('', Validators.required),
            apellidos: new FormControl('', Validators.required),
            rude: new FormControl('', Validators.required),
            fecha_nacimiento: new FormControl('', Validators.required),
            unidad_educativa: new FormControl('', Validators.required),
            departamento: new FormControl('', Validators.required),
            distrito: new FormControl('', Validators.required),
            provincia: new FormControl('', Validators.required),
            domicilio: new FormControl('', Validators.required),
            temas_sociales: new FormControl(''),
            problematica: new FormControl(''),
            edad: new FormControl(''),
            nivel: new FormControl(''),
            grado: new FormControl(''),
            adaptacion: new FormControl(''),
            numero_licencia: new FormControl(''),
            licencia_pre_natal: new FormControl(''),
            detalle_pre_natal: new FormControl(''),
            licencia_post_parto: new FormControl(''),
            detalle_post_parto: new FormControl(''),
            desercion: new FormControl(''),
            numero_transferencia: new FormControl('')
        });
        this.getTematica();
    }
    getTematica(): void {
        this._httpService.get(`tematicas`).subscribe(resp => {
            this.temasSociales = resp;
        });
    }

    register(): void {
        console.log('registro');
        if (this.form.valid) {
            const dataPost = {
                nombres: this.form.controls['nombres'].value,
                apellidos: this.form.controls['apellidos'].value,
                rude: this.form.controls['rude'].value,
                fecha_nacimiento: this.form.controls['fecha_nacimiento'].value,
                unidad_educativa: this.form.controls['unidad_educativa'].value,
                departamento: this.form.controls['departamento'].value,
                distrito: this.form.controls['distrito'].value,
                provincia: this.form.controls['provincia'].value,
                domicilio: this.form.controls['domicilio'].value,
                temas_sociales: this.form.controls['temas_sociales'].value,
                problematica: this.form.controls['problematica'].value,
                edad: this.form.controls['edad'].value,
                nivel: this.form.controls['nivel'].value,
                grado: this.form.controls['grado'].value,
                adaptacion: this.form.controls['adaptacion'].value,
                numero_licencia: this.form.controls['numero_licencia'].value,
                licencia_pre_natal: this.form.controls['licencia_pre_natal']
                    .value,
                detalle_pre_natal: this.form.controls['detalle_pre_natal']
                    .value,
                licencia_post_parto: this.form.controls['licencia_post_parto']
                    .value,
                detalle_post_parto: this.form.controls['detalle_post_parto']
                    .value,
                desercion: this.form.controls['desercion'].value,
                numero_transferencia: this.form.controls['numero_transferencia']
                    .value,
                fecha_creacion: new Date(),
                fecha_modificacion: new Date()
            };
            console.log(dataPost);
            this._httpService.post(`registros`, dataPost).subscribe(
                resp => {
                    this.snackBar.open('La Adición fue correcta', '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-success',
                        duration: 5000
                    });
                    // this.form.reset();
                },
                err => {
                    this.snackBar.open(err.error.error.message, '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-warning',
                        duration: 5000
                    });
                    // this.form.reset();
                }
            );
        }
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
        alert('You have finished the horizontal stepper!');
    }

    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void {
        alert('You have finished the vertical stepper!');
    }
}
