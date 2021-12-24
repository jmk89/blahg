import { FirestorePostService, PostData2 } from './../shared/services/firestorePost.service';
import { FormControl } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: PostData2[] = [];
  posts$: Observable<PostData2>

  constructor(
    private firestorePostService: FirestorePostService
  ) { }

  ngOnInit(): void {
    // this.postsObservable = this.postsService.getRecentPosts();
    // this.postsObservable
    //   .subscribe(response => {
    //     //some jank from
    //     //https://stackoverflow.com/questions/63293324/how-to-turn-a-firebase-rest-api-response-into-an-array-in-typescript
    //     //to help
    //     for (const [key, value] of Object.entries(response)) {
    //       let post = (value as PostData);
    //       post.postID = key;
    //       this.posts.push(value as PostData);
    //     }
    //     this.posts.reverse();

    //   });

    this.firestorePostService.getRecentPosts(10)
    .subscribe(res => {
      console.log(res);
      this.posts = res
    });
  }

  goToPost(f: FormControl) {
    console.log(f);
  }

}
