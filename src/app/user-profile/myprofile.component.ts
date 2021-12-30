import { FirestorePostService, PostData2 } from './../shared/services/firestorePost.service';
import { Observable } from 'rxjs';
import { AuthUser } from '../shared/models/auth-user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseUser } from '../shared/models/firebase-user.model';

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
    const user: FirebaseUser = JSON.parse(localStorage.getItem('firebaseUserData'));
    this.posts$ = this.firestorePostService.getUserPosts(user.uid)
    this.posts$
      .subscribe(res => {
        this.posts = res;
      })
  }

  ngOnDestroy(): void {

  }

}
