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
    this.firestorePostService.getRecentPosts(10)
    .subscribe(res => {
      console.log(res);
      this.posts = res
    });
  }

  goToPost(f: FormControl) {

  }

}
