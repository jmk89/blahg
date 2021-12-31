import { UserPreferencesData } from './../shared/services/user-preferences.service';
import { AuthService, AuthResponseData } from './auth.service';
import { FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  signup = false;
  authForm: FormGroup;
  authObservable: Observable<AuthResponseData>;
  userObservable: Observable<UserPreferencesData>;
  isLoading = false;

  ui: firebaseui.auth.AuthUI;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    //angular fire auth returns a promise "app"
    //which we then wait for it to return a firebase.app.App
    //this means firebase sdk is initialized and ready to use.
    this.afAuth.app.then(app => {
      const uiConfig = {
          signInOptions: [
              EmailAuthProvider.PROVIDER_ID,
              GoogleAuthProvider.PROVIDER_ID
          ],
          callbacks: {
              //all references to this within LoginSuccessful will now correctly
              //identify with this instance of the LoginComponent
              signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
          }
      };

      this.ui = new firebaseui.auth.AuthUI(app.auth());
      //select the css id
      this.ui.start("#firebaseui-auth-container", uiConfig);
      this.ui.disableAutoSignIn();

    });
  }

  onLoginSuccessful(result) {
    console.log('firebase ui result: ', result)
    this.router.navigateByUrl('/profile');
  }

  ngOnDestroy(): void {
    if (this.ui) this.ui.delete();
  }



}
