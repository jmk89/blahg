import { FirestorePostService, PostData2 } from './../shared/services/firestorePost.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthUser } from '../shared/models/auth-user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit, OnDestroy {
  newPostForm: FormGroup;
  userPostSubscription: Subscription;
  recentPostSubscription: Subscription;

  constructor(
    private router: Router,
    private firestorePostService: FirestorePostService
  ) { }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      'title': new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ),
      'body': new FormControl(
        null,
        [
          Validators.required
        ]
      )
    });
  }

  onSubmit() {
    const title = this.newPostForm.controls['title'].value
    const body = this.newPostForm.controls['body'].value
    const user: AuthUser = JSON.parse(localStorage.getItem('userData'));

    const newPost: PostData2 = {
      userID: user.id,
      postDate: new Date(),
      title: title,
      body: body
    }
    this.firestorePostService.addPost(newPost)
      .subscribe();

    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    //this.userPostSubscription.unsubscribe();
    //this.recentPostSubscription.unsubscribe();
  }

}

