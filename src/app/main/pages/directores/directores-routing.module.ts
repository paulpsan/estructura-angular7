import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoresComponent } from './directores.component';

const routes: Routes = [
    {
        path: 'directores',
        component: DirectoresComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DirectoresRoutingModule {}
