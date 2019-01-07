import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './listado.component';
import { ListadoService } from './listado.service';

const routes: Routes = [
    {
        path: 'listado',
        component: ListadoComponent,
        resolve: {
            data: ListadoService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListadoRoutingModule {}
