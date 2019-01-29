import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
    MatSnackBar,
    PageEvent,
    MatPaginator,
    MatSort,
    MatTableDataSource
} from '@angular/material';
import { HttpService } from 'app/main/services/http.service';

@Component({
    selector: 'app-tematicas',
    templateUrl: './tematicas.component.html',
    styleUrls: ['./tematicas.component.scss']
})
export class TematicasComponent implements OnInit {
    form: FormGroup;
    acctionEdit = false;
    acctionNew = true;
    dataSelect;
    column: string[] = ['titulo', 'descripcion', 'accion'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;
    constructor(
        private _formBuilder: FormBuilder,
        private _httpService: HttpService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required]
        });
        this.obtenerDatos();
    }

    edit(row): void {
        console.log(row);
        this.dataSelect = row;
        this.acctionEdit = true;
        this.acctionNew = false;
        this.form.setValue({
            titulo: row.titulo,
            descripcion: row.descripcion
        });
    }
    cancelar(): void {
        console.log('object');
        this.form.reset();
    }
    addTematica(): void {
        const dataPost = {
            titulo: this.form.controls['titulo'].value,
            descripcion: this.form.controls['descripcion'].value
        };
        console.log(dataPost);
        this._httpService.post(`tematicas`, dataPost).subscribe(
            resp => {
                this.snackBar.open('La Adición fue correcta', '', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'background-success',
                    duration: 5000
                });
                this.form.reset();
                this.obtenerDatos();
            },
            err => {
                this.snackBar.open(err.error.error.message, '', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'background-warning',
                    duration: 5000
                });
                this.form.reset();
            }
        );
    }

    save(): void {
        const dataPost = {
            titulo: this.form.controls['titulo'].value,
            descripcion: this.form.controls['descripcion'].value
        };
        this._httpService
            .patch(`tematicas`, this.dataSelect.id, dataPost)
            .subscribe(
                resp => {
                    this.snackBar.open('La Edición fue correcta', '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-success',
                        duration: 5000
                    });
                    this.acctionEdit = false;
                    this.acctionNew = true;
                    this.dataSelect = undefined;
                    this.form.reset();
                    this.obtenerDatos();
                },
                err => {
                    this.snackBar.open(err.error.error.message, '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-warning',
                        duration: 5000
                    });
                }
            );
    }

    delete(element): void {
        console.log(element);
        if (confirm('Esta seguro de eliminar la tematica: ' + element.titulo)) {
            this._httpService.delete(`tematicas`, element.id).subscribe(
                resp => {
                    this.snackBar.open('La eliminación fue correcta', '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-success',
                        duration: 5000
                    });
                    this.form.reset();
                    this.obtenerDatos();
                },
                err => {
                    this.snackBar.open(err.error.error.message, '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-warning',
                        duration: 5000
                    });
                }
            );
        }
    }
    obtenerDatos(event?: PageEvent): void {
        this._httpService.get(`tematicas`).subscribe(resp => {
            this.dataSource = new MatTableDataSource(resp);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string): void {
        console.log(filterValue);
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
