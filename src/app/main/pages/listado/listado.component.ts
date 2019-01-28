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

export class FilesDataSource extends DataSource<any> {
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {ListadoService} _ListadoService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _ListadoService: ListadoService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();

        this.filteredData = this._ListadoService.orders;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._ListadoService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this._ListadoService.orders.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex =
                    this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );
    }

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._matSort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'reference':
                    [propertyA, propertyB] = [a.reference, b.reference];
                    break;
                case 'customer':
                    [propertyA, propertyB] = [
                        a.customer.firstName,
                        b.customer.firstName
                    ];
                    break;
                case 'total':
                    [propertyA, propertyB] = [a.total, b.total];
                    break;
                case 'payment':
                    [propertyA, propertyB] = [
                        a.payment.method,
                        b.payment.method
                    ];
                    break;
                case 'status':
                    [propertyA, propertyB] = [
                        a.status[0].name,
                        b.status[0].name
                    ];
                    break;
                case 'date':
                    [propertyA, propertyB] = [a.date, b.date];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSort.direction === 'asc' ? 1 : -1)
            );
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {}
}
