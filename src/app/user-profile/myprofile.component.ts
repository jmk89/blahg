import { FirestorePostService, PostData2 } from './../shared/services/firestorePost.service';
import { Observable } from 'rxjs';
import { AuthUser } from '../shared/models/auth-user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit, OnDestroy {
  posts$: Observable<PostData2[]>;
  posts: PostData2[] = [];

  constructor(
    private firestorePostService: FirestorePostService
  ) { }

  ngOnInit(): void {
    const user: AuthUser = JSON.parse(localStorage.getItem('userData'));
    // this.postsObservable = this.postService.getPostsForUserID(user.id);
    // this.postsObservable
    //   .subscribe(response => {
    //     //some jank from
    //     //https://stackoverflow.com/questions/63293324/how-to-turn-a-firebase-rest-api-response-into-an-array-in-typescript
    //     //to help
    //     for (const [key, value] of Object.entries(response)) {
    //       let post = (value as PostData)
    //       post.postID = key;
    //       this.posts.push(value as PostData)
    //     }
    //     this.posts.reverse();
    //     // console.log(this.posts)
    //   })
    console.log('init')
    this.posts$ = this.firestorePostService.getUserPosts(user.id)
    this.posts$
      .subscribe(res => {
        console.log(res)
        this.posts = res;
      })
  }

  ngOnDestroy(): void {

  }

}
