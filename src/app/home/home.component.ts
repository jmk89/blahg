import { FormControl } from '@angular/forms';
import { PostData, PostService } from '../shared/services/post.service';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: PostData[] = [];
  postsObservable: Observable<any>

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.postsObservable = this.postsService.getRecentPosts();
    this.postsObservable
      .subscribe(response => {
        //some jank from
        //https://stackoverflow.com/questions/63293324/how-to-turn-a-firebase-rest-api-response-into-an-array-in-typescript
        //to help
        for (const [key, value] of Object.entries(response)) {
          let post = (value as PostData);
          post.postID = key;
          this.posts.push(value as PostData);
        }
        this.posts.reverse();

      });
  }

  goToPost(f: FormControl) {
    console.log(f);
  }

}
