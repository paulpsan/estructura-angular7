import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from 'theme/services/config.service';
import { fuseAnimations } from 'theme/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'app/main/services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: [
                '',
                [Validators.required, confirmPasswordValidator]
            ]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm
            .get('password')
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm
                    .get('passwordConfirm')
                    .updateValueAndValidity();
            });
    }
    // Creacion de usuario
    createUser(): void {
        const user = {
            nombre: this.registerForm.controls['name'].value,
            apellido: this.registerForm.controls['lastname'].value,
            username: this.registerForm.controls['username'].value,
            email: this.registerForm.controls['email'].value,
            password: this.registerForm.controls['password'].value
        };
        console.log(user);

        this._userService.createUser(user).subscribe(
            data => {
                console.log(data);
                this.registerForm.reset();
                this.snackBar.open('Usuario creado exitosamente!!', '', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'background-success',
                    duration: 3000
                });
                this.router.navigate(['auth/login']);
            },
            err => {
                this.snackBar.open(err.error.error.message, '', {
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass: 'background-danger',
                    duration: 5000
                });
            }
        );
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
