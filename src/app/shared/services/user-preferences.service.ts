import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface UserPreferencesData {
  userID: string,
  displayName: string,
  publicEmail: boolean,
  bio: string
}

@Injectable({providedIn: 'root'})
export class UserPreferencesService {

  constructor(private http: HttpClient) { }

  saveFormPreferences(displayName: string, publicEmail: string, bio: string) {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        return;
    }

    let userPrefObject = {userID: userData.id, displayName: displayName, publicEmail: publicEmail, bio: bio};
    return this.http.post<UserPreferencesData>(
      `https://blahg-5b828-default-rtdb.firebaseio.com/users/${userPrefObject.userID}/preferences.json`,
      userPrefObject
    )
  }

}
