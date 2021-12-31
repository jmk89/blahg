import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { filter, map, Observable, tap } from 'rxjs';
import { UserRoles } from '../models/user-roles';
import firebase from 'firebase/compat/app';
import { FirebaseUser } from '../models/firebase-user.model';

export interface UserData {
  email: string,
  uid: string,
  displayName: string,
  pictureUrl: string
}

@Injectable({providedIn: 'root'})
export class UserService {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;
  roles$: Observable<UserRoles>;
  userData$: Observable<UserData>;
  test: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
      //setting up observables for our components to subscribe to
      this.isLoggedIn$ = afAuth.authState
        .pipe(
          map(user => {
            return user ? true : false;
          })
        )
      this.isLoggedOut$ = this.isLoggedIn$
        .pipe(
          map(isLoggedIn => !isLoggedIn)
        )
      this.roles$ = afAuth.idTokenResult
        .pipe(
          map(token => {
            return <any>token?.claims ?? {admin: false}
          })
        )
      this.userData$ = afAuth.user
        .pipe(
          //the epic filter
          filter(user => !!user),
          map(user => {
            return <UserData>{
              email: user.email,
              displayName: user.displayName,
              uid: user.uid,
              pictureUrl: user.photoURL
            }
          }),
          tap(u => {
            const user = new FirebaseUser(u.email, u.displayName,
              u.pictureUrl, u.uid)
              localStorage.setItem('firebaseUserData', JSON.stringify(user));
          })
        )
     }



     logout() {
       this.afAuth.signOut();
       this.router.navigateByUrl('/home');
       localStorage.removeItem('firebaseUserData');
      localStorage.removeItem('userPreferences');
     }

     getLocalUserData(): UserData {
       return <UserData>JSON.parse(localStorage.getItem('firebaseUserData'));
     }



}
