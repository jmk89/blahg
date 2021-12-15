import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signup = false;
  authForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

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

    console.log("here")
  }

}
