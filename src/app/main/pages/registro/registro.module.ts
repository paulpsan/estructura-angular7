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
import { FuseSharedModule } from 'theme/shared.module';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';

@NgModule({
    declarations: [RegistroComponent],
    imports: [
        CommonModule,
        RegistroRoutingModule,

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
export class RegistroModule {}
