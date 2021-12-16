import { Observable } from 'rxjs';
import { User } from './../user/user.model';
import { PostService, PostData, JankyFirebasePostData } from './../services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit, OnDestroy {
  postsObservable: Observable<JankyFirebasePostData>;
  posts: PostData[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    this.postsObservable = this.postService.getPostsForUserID(user.id);
    this.postsObservable
      .subscribe(response => {
        //some jank from
        //https://stackoverflow.com/questions/63293324/how-to-turn-a-firebase-rest-api-response-into-an-array-in-typescript
        //to help
        for (const [key, value] of Object.entries(response)) {
          this.posts.push(value as PostData)
        }
        console.log(this.posts)
      })
  }

  ngOnDestroy(): void {
      
  }

}
