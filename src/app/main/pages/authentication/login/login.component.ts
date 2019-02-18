import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from 'theme/services/config.service';
import { fuseAnimations } from 'theme/animations';
import { UserService } from 'app/main/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private router: Router,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private snackBar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    // Inicia Sesión

    login(): void {
        const user = {
            email: this.loginForm.controls['email'].value,
            password: this.loginForm.controls['password'].value
        };
        console.log(user);
        this._userService.loginUser(user).subscribe(
            data => {
                console.log(data);
                this.router.navigate(['pages/listado']);
            },
            err => {
                console.log(err);
                this.snackBar.open(err.error.error.message, '', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'background-danger',
                    duration: 15000
                });
            }
        );
    }
}
