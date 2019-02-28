import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
  MatTooltipModule,
  MatSortModule,
  MatCheckboxModule
} from '@angular/material';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { FuseSharedModule } from 'theme/shared.module';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    ReportesRoutingModule,

    MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        FuseSharedModule
  ]
})
export class ReportesModule { }
