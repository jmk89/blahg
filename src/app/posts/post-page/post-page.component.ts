import { FirestorePostService } from '../../shared/services/firestorePost.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostData2 } from '../../shared/services/firestorePost.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  postID: string;
  postUserID: string;
  post$: Observable<PostData2>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: FirestorePostService
    ) {
    activatedRoute.params.subscribe(params => {
      this.postID = params['postID'];
      this.postUserID = params['userID'];
    })
    this.post$ = this.postService.getUserPost(this.postUserID, +this.postID);
   }

  ngOnInit(): void {
  }

}
