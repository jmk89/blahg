import { UserPreferencesService } from './../shared/services/user-preferences.service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ReplaySubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthUser } from "../shared/models/auth-user.model";

//defined at https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
//not a requirement of Angular, but makes life easier to have it defined in an interface
export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean //this is only used for sign in requests, not sign UP requests
}

//make this available application wide
@Injectable({providedIn: 'root'})
export class AuthService {
    public user = new ReplaySubject<AuthUser>(1);
    private tokenExpirationTimer: any;

    constructor(
      private http: HttpClient,
      private router: Router,
      private userService: UserPreferencesService
      ) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxaU5ycfSRJsXUVUnLimne1KGnpAQiEmY",
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(response => {
              this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn);
              this.userService.createUserPreferences(response.localId)
                .subscribe();
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxaU5ycfSRJsXUVUnLimne1KGnpAQiEmY",
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(response => {
                this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn)
                this.userService.getUserPreferencesFromDB(response.localId).subscribe();
            })
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new AuthUser(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        localStorage.removeItem('userPreferences');
    }

    handleAuth(email: string, userID: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new AuthUser(email, userID, token, expirationDate);
        this.user.next(user)
        localStorage.setItem('userData', JSON.stringify(user));
    }

    getLocalUserData(): AuthUser {
      return JSON.parse(localStorage.getItem('userData'));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred"
        //check if the errorResponse has the expected object structure
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(() => new Error(errorMessage));
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "Email already exists"
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Email doesn't exist"
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Incorrect password"
                break;
        }
        return throwError(errorMessage);
    }
}
