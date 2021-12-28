import { from, map, Observable } from 'rxjs';
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

    return from(this.db.doc(`users/${userID}`).set(newUser));
  }

  getUserPreferences(userID: string) {
    return this.db.collection(
      `users`,
      ref => ref.where('userID', '==', userID))
      .get()
      .pipe(
        map(result => convertSnaps<UserPreferencesData>(result))
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

    const path = 'preferences';
    const userID = userData.id;

    return from(this.db.doc<UserPreferencesData>(`users/${userID}`).update(prefs));

    //let userPrefObject = {userID: userData.id, displayName: displayName, publicEmail: publicEmail, bio: bio};
    // return this.http.post<UserPreferencesData>(
    //   `https://blahg-5b828-default-rtdb.firebaseio.com/users/${userPrefObject.userID}/preferences.json`,
    //   userPrefObject
    // )


  }

}
