import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewEncapsulation,
    OnDestroy
} from "@angular/core";
import { merge, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { FuseNavigationService } from "theme/components/navigation/navigation.service";
import { navigation } from "app/navigation/navigation";
import { UserService } from "app/main/services/user.service";
import { ClassField } from "@angular/compiler";

@Component({
    selector: "fuse-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit,OnDestroy {
    @Input()
    layout = "vertical";

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _userService: UserService
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
        this.navigation = navigation;
        this._userService.usuario$.subscribe(user => {
            if (Object.keys(user).length !== 0) {
                this.navigation = this.generaRol(user, navigation);
                this._fuseNavigationService.register("main", this.navigation);
                this._fuseNavigationService.setCurrentNavigation("main");
                console.log(this._fuseNavigationService.getCurrentNavigation());
            }
        });
        // Load the navigation either from the input or from the service
        this.navigation =
            this.navigation ||
            this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Load the navigation
                this.navigation = this._fuseNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
    generaRol(user, nav) {
        console.log(nav);
        let navReturn = [
            {
                id: "applications",
                title: "Aplicaciones",
                translate: "NAV.APPLICATIONS",
                type: "group",
                children: [
                    {
                        id: "Registro",
                        title: "Registro",
                        type: "item",
                        icon: "library_add",
                        url: "/pages/registro"
                    },
                    {
                        id: "Listado",
                        title: "Listado",
                        type: "item",
                        icon: "receipt",
                        url: "/pages/listado"
                    }
                ]
            }
        ];
        if (user.roles.length > 0) {
            if (user.roles[0].name == "admin") {
                navReturn.push({
                    id: "administracion",
                    title: "Administracion",
                    translate: "Administracion",
                    type: "group",
                    children: [
                        {
                            id: "Usuarios",
                            title: "Usuarios",
                            type: "item",
                            icon: "person",
                            url: "/pages/usuarios"
                        },
                        {
                            id: "Tematica",
                            title: "Temática",
                            type: "item",
                            icon: "label",
                            url: "/pages/tematica"
                        },
                        {
                            id: "Reportes",
                            title: "reportes",
                            type: "item",
                            icon: "file_copy",
                            url: "/pages/reportes"
                        }
                    ]
                });
                return navReturn;
            } else {
                navReturn.push({
                    id: "administracion",
                    title: "Administracion",
                    translate: "Administracion",
                    type: "group",
                    children: [
                        {
                            id: "Tematica",
                            title: "Temática",
                            type: "item",
                            icon: "label",
                            url: "/pages/tematica"
                        },
                        {
                            id: "Reportes",
                            title: "reportes",
                            type: "item",
                            icon: "file_copy",
                            url: "/pages/reportes"
                        }
                    ]
                });
                return navReturn;
            }
        } else {
            return navReturn;
        }
    }
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        console.log("destroy");
        this._fuseNavigationService.unregister("main")
    }
}
