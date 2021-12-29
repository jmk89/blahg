import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { concatMap, from, map, Observable, tap } from "rxjs";
import { convertSnaps } from "../db-utils";
import { UserPreferencesService } from "./user-preferences.service";

export interface PostData2 {
  userID: string,
  postDate: Date,
  userDisplayName?: string,
  title: string,
  body: string,
  postID?: number
}

@Injectable({ providedIn: 'root' })
export class FirestorePostService {

  constructor(
    private db: AngularFirestore,
    private userPrefs: UserPreferencesService) { }

  getRecentPosts(limit: number) {
    return this.db.collection(
      'posts',
      ref => ref.orderBy('postID', 'desc').limit(limit)
    )
    .get()
    .pipe(
      map(result => convertSnaps<PostData2>(result))
    )
  }

  getUserPosts(user: string) {
    return this.db.collection(
      `users/${user}/posts`)
    .get()
    .pipe(
      map(result => convertSnaps<PostData2>(result))
    )
  }

  addPost(post: Partial<PostData2>): Observable<any> {
    const path = `users/${post.userID}/posts`
    return this.db.collection(
      path,
      ref => ref.orderBy('postID', 'desc').limit(1)
    )
    .get()
    .pipe(
      concatMap(snaps => {
        const posts = convertSnaps<PostData2>(snaps);
        const latestPostId = posts[0]?.postID ?? 0
        const newPost = {
          ...post,
          postID: latestPostId + 1
        }
        const newAllPost = {
          ...newPost,
          userDisplayName: this.userPrefs.displayNameGet()
        }
        console.log(newAllPost)
        //just throw this in the "all posts" section to display on
        //front page
        from(this.db.collection('posts').add(newAllPost)).subscribe();
        return from(this.db.collection(path).add(newPost));
      })
    )
  }

}
