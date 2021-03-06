import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    MatPaginator,
    MatSort,
    MatSnackBar,
    MatTableDataSource
} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from 'theme/animations';
import { FuseUtils } from 'theme/utils';

import { takeUntil } from 'rxjs/internal/operators';
import { ListadoService } from './listado.service';
import { HttpService } from 'app/main/services/http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ListadoComponent implements OnInit, OnDestroy {
    dataSource: MatTableDataSource<any>;
    displayedColumns = [
        'nro',
        'rude',
        'estudiante',
        'unidad_educativa',
        'departamento',
        'temas_sociales',
        'problematica',
        'estado',
        'accion'
    ];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild('filter')
    filter: ElementRef;

    @ViewChild(MatSort)
    sort: MatSort;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ListadoService} _ListadoService
     */
    constructor(
        private _ListadoService: ListadoService,
        private _httpService: HttpService,
        private snackBar: MatSnackBar,
        private router: Router
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
        // this.dataSource = new FilesDataSource(
        //     this._ListadoService,
        //     this.paginator,
        //     this.sort
        // );
        // fromEvent(this.filter.nativeElement, 'keyup')
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(150),
        //         distinctUntilChanged()
        //     )
        //     .subscribe(() => {
        //         if (!this.dataSource) {
        //             return;
        //         }
        //         this.dataSource.filter = this.filter.nativeElement.value;
        //     });
        this.getRegistros();
    }

    getRegistros(): void {
        let contador = 1;
        this._httpService.get(`registros`).subscribe(resp => {
            resp.map(data => {
                data.nro = contador;
                data.estado = 'iniciado';
                contador++;
                return data;
            });
            console.log(resp);
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

    delete(element): void {
        console.log(element);
        if (
            confirm(
                `Esta seguro de eliminar el registro : ${element.nombres} ${
                    element.apellidos
                }`
            )
        ) {
            this._httpService.delete(`registros`, element.id).subscribe(
                resp => {
                    this.snackBar.open('La eliminación fue correcta', '', {
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                        panelClass: 'background-success',
                        duration: 5000
                    });
                    this.getRegistros();
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
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
