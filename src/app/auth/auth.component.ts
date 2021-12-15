import { AuthService, AuthResponseData } from './auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  signup = false;
  authForm: FormGroup;
  authObservable: Observable<AuthResponseData>;
  isLoading = false;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, 
        [
          Validators.required,
          Validators.email
        ]),
      'password': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(8)
        ])
    });
  }

  switchMode() {
    this.signup = !this.signup;
  }

  onSubmit() {
    //make http request
    if (!this.authForm.valid || this.authForm.pristine || this.authForm.untouched) {
      return;
    }
    this.isLoading = true;
    const email = this.authForm.controls['email'].value;
    const password = this.authForm.controls['password'].value;
    

    if (this.signup) {
      console.log('signup')
      this.authObservable = this.authService.signUp(email, password);
    } else {
      this.authObservable = this.authService.login(email, password);
    }

    this.authObservable.subscribe(
      response => {
        console.log(response);
      },
      errorMessage => {
        console.log(errorMessage);
      }
    )

    this.isLoading = false;
    this.authForm.reset();
  }

  ngOnDestroy(): void {
    
  }

  

}
