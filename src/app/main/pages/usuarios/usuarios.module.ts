import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FuseSharedModule } from 'theme/shared.module';
import { FuseWidgetModule } from 'theme/components';

@NgModule({
    declarations: [UsuariosComponent, EditUserComponent],
    imports: [
        CommonModule,
        UsuariosRoutingModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,

        FuseSharedModule,
        FuseWidgetModule
    ]
})
export class UsuariosModule {}
