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

  createUserPreferences(userID: string): Observable<any> {
    const userData: {
      email: string,
      displayName: string,
      pictureUrl: string,
      uid: string
    } = JSON.parse(localStorage.getItem('firebaseUserData'));
    if (!userData) {
        return;
    }

    const path = 'users';
    const newUser: UserPreferencesData = {
      userID: userData.uid,
      displayName: userData.displayName,
      publicEmail: false,
      bio: ""
    }

    return from(this.db.doc(`users/${userID}`).set(newUser))
      .pipe(
        tap(() => {
          this.updateLocalStorageWithDBPrefs(userID).subscribe();
        })
      );
  }

  updateLocalStorageWithDBPrefs(userID: string) {
    return this.db.collection(
      `users`,
      ref => ref.where('userID', '==', userID))
      .get()
      .pipe(
        map(result => convertSnaps<UserPreferencesData>(result)[0]),
        tap(result => {
          let userPrefs = result;
          this.handleUserPreferences(userPrefs);
        })
      );

  }

  updateUserPreferences(prefs: UserPreferencesData) {
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

    return from(this.db.doc<UserPreferencesData>(`users/${userID}`).update(prefs))
      .pipe(
        tap(() => {
          this.handleUserPreferences(prefs);
        })
      );
  }

  handleUserPreferences(prefs: UserPreferencesData) {
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
  }

  displayNameGet() {
    const data: FirebaseUser = JSON.parse(localStorage.getItem('firebaseUserData'));
    return data.displayName;
  }

}
