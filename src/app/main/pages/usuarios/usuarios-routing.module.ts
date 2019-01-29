import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UsuariosComponent
    },
    {
        path: 'usuarios/:id',
        component: EditUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {}
