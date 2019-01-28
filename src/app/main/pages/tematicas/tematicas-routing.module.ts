import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TematicasComponent } from './tematicas.component';

const routes: Routes = [
    {
        path: 'tematica',
        component: TematicasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TematicasRoutingModule {}
