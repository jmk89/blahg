import { from, map, Observable, tap } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from "@angular/fire/compat/firestore";
import { convertSnaps } from '../db-utils';

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
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        return;
    }

    const path = 'users';
    const newUser: UserPreferencesData = {
      userID: userData.id,
      displayName: "",
      publicEmail: false,
      bio: ""
    }

    return from(this.db.doc(`users/${userID}`).set(newUser))
      .pipe(
        tap(() => {
          this.getUserPreferencesFromDB(userID).subscribe();
        })
      );
  }

  getUserPreferencesFromDB(userID: string) {
    return this.db.collection(
      `users`,
      ref => ref.where('userID', '==', userID))
      .get()
      .pipe(
        map(result => convertSnaps<UserPreferencesData>(result)),
        tap(result => {
          let userPrefs = result[0];
          this.handleUserPreferences(userPrefs);
        })
      );

  }

  updateUserPreferences(prefs: UserPreferencesData) {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        return;
    }

    const userID = userData.id;

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
    const data: UserPreferencesData = JSON.parse(localStorage.getItem('userPreferences'));
    return data.displayName;
  }

}
