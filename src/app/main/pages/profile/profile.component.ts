import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from 'theme/animations';
import { UserService } from 'app/main/services/user.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent  implements OnInit
{
    usuario;
    /**
     * Constructor
     */
    constructor(
        private _userService: UserService
    )
    {

    }

    ngOnInit(): void {
        this._userService.usuario$.subscribe(resp=>{
            this.usuario=resp;
        })
        
    }
}
