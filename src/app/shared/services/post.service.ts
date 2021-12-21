import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';

export interface PostData {
    userID: string,
    title: string,
    body: string,
    postID: string
}

export interface JankyFirebasePostData {
    root: [{
        [key: string]: {
            post: PostData
        }
    }]
}

@Injectable({providedIn: 'root'})
export class PostService {

    constructor(private http: HttpClient) { }

    createNewPost(userID: string, title: string, body: string) {
      let postObject = {'userID': userID, 'title': title, 'body': body}
      return this.http.post<PostData>(
          `https://blahg-5b828-default-rtdb.firebaseio.com/users/${userID}/posts.json`,
          postObject
      ).pipe(
          catchError(this.handleError),
          tap(response => {
              console.log(response)
          })
      )
    }

    createNewRecentPost(userID: string, title: string, body: string) {
      let postObject = {'userID': userID, 'title': title, 'body': body}
      return this.http.post<PostData>(
          `https://blahg-5b828-default-rtdb.firebaseio.com/general/recentPosts.json`,
          postObject
      ).pipe(
          catchError(this.handleError),
          tap(response => {
              console.log(response)
          })
      )
    }

    getPostsForUserID(userID: string) {
        return this.http.get<JankyFirebasePostData>(
            `https://blahg-5b828-default-rtdb.firebaseio.com/users/${userID}/posts.json`
        ).pipe(
            tap(posts => {
                // let j: JankyFirebasePostData = posts
                // const s = JSON.stringify(j);
                // const js = JSON.parse(s);
                // console.log(js);
            })
        );
    }

    getRecentPosts() {
        return this.http.get(
            "https://blahg-5b828-default-rtdb.firebaseio.com/general/recentPosts.json"
        ).pipe(
            tap(posts => {

            })
        )
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred"
        return throwError(() => new Error(errorMessage));
    }

}
