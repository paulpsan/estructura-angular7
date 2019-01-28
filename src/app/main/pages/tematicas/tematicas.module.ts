import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TematicasRoutingModule } from './tematicas-routing.module';
import { TematicasComponent } from './tematicas.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule
} from '@angular/material';
import { FuseSharedModule } from 'theme/shared.module';


@NgModule({
    declarations: [TematicasComponent],
    imports: [
        TematicasRoutingModule,

        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule
    ]
})
export class TematicasModule {}
