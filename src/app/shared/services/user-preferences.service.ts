import { from, map, Observable, tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from "@angular/fire/compat/firestore";
import { convertSnaps } from '../db-utils';
import { FirebaseUser } from '../models/firebase-user.model';

export interface UserPreferencesData {
  userID: string,
  displayName: string,
  publicEmail: boolean,
  bio: string
}

@Injectable({providedIn: 'root'})
export class UserPreferencesService {

  userPrefsDoc: AngularFirestoreDocument<UserPreferencesData>;
  prefs: Observable<UserPreferencesData>;

  constructor(
    private http: HttpClient,
    private db: AngularFirestore) {
  }

  createUserPreferences(userID: string) {
    const userData: {
      email: string,
      displayName: string,
      pictureUrl: string,
      uid: string
    } = JSON.parse(localStorage.getItem('firebaseUserData'));
    if (!userData) {
        return;
    }

    const newUser: UserPreferencesData = {
      userID: userData.uid,
      displayName: userData.displayName,
      publicEmail: false,
      bio: ""
    }

    this.setLocalStoragePrefs(newUser);
    from(this.db.doc(`users/${userID}`).set(newUser)).subscribe();
  }

  readDBPrefs() {
    const userData: {
      email: string,
      displayName: string,
      pictureUrl: string,
      uid: string
    } = JSON.parse(localStorage.getItem('firebaseUserData'));
    if (!userData) {
        return;
    }

    const userID = userData.uid;

    return this.db.collection(
      'users',
      ref => ref.where('userID', '==', userID))
      .get()
      .pipe(
        tap(result => console.log("before map", result)),
        map(result => convertSnaps<UserPreferencesData>(result)[0]),
        tap(result => console.log("after map", result))
      )
  }

  //updates locally and in DB
  updateUserPrefs(prefs: UserPreferencesData) {
    const userData: {
      email: string,
      displayName: string,
      pictureUrl: string,
      uid: string
    } = JSON.parse(localStorage.getItem('firebaseUserData'));
    if (!userData) {
        return;
    }

    const userID = userData.uid;

    from(this.db.doc<UserPreferencesData>(`users/${userID}`).update(prefs))
      .pipe(
        tap(() => {
          this.setLocalStoragePrefs(prefs);
        })
      )
      .subscribe();
  }

  setLocalStoragePrefs(prefs: UserPreferencesData) {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
  }

  displayNameGet() {
    // const data: FirebaseUser = JSON.parse(localStorage.getItem('firebaseUserData'));
    // return data.displayName;
    return JSON.parse(localStorage.getItem('userPreferences')).displayName;
  }

}
