import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule
} from '@angular/material';
import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { SeguimientoComponent } from './seguimiento.component';
import { FuseSharedModule } from 'theme/shared.module';

@NgModule({
    declarations: [SeguimientoComponent],
    imports: [
        CommonModule,
        SeguimientoRoutingModule,

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        FuseSharedModule
    ]
})
export class SeguimientoModule {}
