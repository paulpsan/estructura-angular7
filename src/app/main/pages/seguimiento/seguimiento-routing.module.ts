import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeguimientoComponent } from './seguimiento.component';

const routes: Routes = [
    {
        path: 'seguimiento/:id',
        component: SeguimientoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeguimientoRoutingModule {}
