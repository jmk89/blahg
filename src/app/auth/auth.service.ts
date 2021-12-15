import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

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

    constructor(private http: HttpClient) { }

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
                console.log(response);
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
                console.log(response);
            })
        );
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred"
        //check if the errorResponse has the expected object structure
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage)
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