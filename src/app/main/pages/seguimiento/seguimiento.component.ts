import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import { HttpService } from 'app/main/services/http.service';
import { fuseAnimations } from 'theme/animations';

@Component({
    selector: 'app-seguimiento',
    templateUrl: './seguimiento.component.html',
    styleUrls: ['./seguimiento.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class SeguimientoComponent implements OnInit {
    id;
    registro;
    statuses = [
        { id: 1, nombre: 'inicial', color: 'green' },
        { id: 2, nombre: 'critico', color: 'red' }
    ];
    statusForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _httpService: HttpService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._httpService
                .getByid('registros', this.id)
                .subscribe((resp: any) => {
                    resp.estados = [
                        {
                            nombre: 'inicial',
                            color: 'green',
                            fecha: new Date(),
                            usuario: 'usuario'
                        }
                    ];
                    this.registro = resp;
                });
        });

        this.statusForm = this._formBuilder.group({
            newStatus: ['']
        });
    }
    updateStatus(): void {
        // tslint:disable-next-line:radix
        const newStatusId = Number.parseInt(
            this.statusForm.get('newStatus').value
        );

        if (!newStatusId) {
            return;
        }

        const newStatus = this.statuses.find(status => {
            return status.id === newStatusId;
        });

        newStatus['fecha'] = new Date().toString();

        this.registro.estados.unshift(newStatus);
    }
}
