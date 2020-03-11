import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    showSignup = false;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        console.log({ ...this });
        // this.email = 'not this email' ;
    }

    ngOnDestroy(): void {
        console.log('with great power comes great responsibility');
    }

    toggleSignup(): void {
        this.showSignup = !this.showSignup;
        this.email = '';
        this.password = '';

    }

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/my-tavern');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }

    signup(): void {
        // const payload = {
        //     email: this.email,
        //     password: this.password,
        this.router.navigateByUrl('/signup');
    };
    // console.log(payload)

    toggleSignup() : void {}


}


