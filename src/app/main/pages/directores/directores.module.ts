import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoresRoutingModule } from './directores-routing.module';
import { DirectoresComponent } from './directores.component';

@NgModule({
    declarations: [DirectoresComponent],
    imports: [CommonModule, DirectoresRoutingModule]
})
export class DirectoresModule {}
