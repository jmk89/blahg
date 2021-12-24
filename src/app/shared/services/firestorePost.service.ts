import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { concatMap, from, map, Observable, tap } from "rxjs";
import { convertSnaps } from "../db-utils";

export interface PostData2 {
  userID: string,
  title: string,
  body: string,
  postID?: number
}

@Injectable({ providedIn: 'root' })
export class FirestorePostService {

  constructor(private db: AngularFirestore) { }

  getRecentPosts(limit: number) {
    console.log('getting top most recent posts')
    return this.db.collection(
      'posts',
      ref => ref.orderBy('postID', 'desc').limit(limit)
    )
    .get()
    .pipe(
      map(result => convertSnaps<PostData2>(result)),
      tap(result => console.log(result))
    )
  }

  getUserPosts(user: string) {
    return this.db.collection(
      'posts',
      ref => ref.where('userID', '==', user)
    )
    .get()
    .pipe(
      map(result => convertSnaps<PostData2>(result))
    )
  }

  addPost(post: Partial<PostData2>): Observable<any> {
    const path = `posts`
    return this.db.collection(
      path,
      ref => ref.orderBy('postId', 'desc').limit(1)
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
        console.log(newPost);
        return from(this.db.collection(path).add(newPost));
      })
    )
  }

}
