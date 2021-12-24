import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { concatMap, from, map, Observable } from "rxjs";
import { convertSnaps } from "../db-utils";

export interface PostData2 {
  userID: string,
  title: string,
  body: string,
  postID?: number
}

@Injectable({
  providedIn: 'root'
})
export class FirestorePostService {

  constructor(private db: AngularFirestore) { }

  getPosts() {
    console.log('getting posts')
    return this.db.collection(
      'posts'
    )
    .get()
    .pipe(
      map(result => convertSnaps<any>(result))
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
