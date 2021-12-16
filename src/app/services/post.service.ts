import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export interface PostData {
    userID: string,
    title: string,
    body: string
}

@Injectable({providedIn: 'root'})
export class PostService {

    constructor(private http: HttpClient) { }

    createNewPost(userID: string, title: string, body: string) {
        let postObject = {'userID': userID, 'title': title, 'body': body}
        console.log(postObject)
        return this.http.post<PostData>(
            "https://blahg-5b828-default-rtdb.firebaseio.com/posts.json",
            postObject
        ).pipe(
            catchError(this.handleError),
            tap(response => {
                console.log(response)
            })
        )
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred"
        return throwError(() => new Error(errorMessage));
    }

}