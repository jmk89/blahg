import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthUser } from '../shared/models/auth-user.model';
import { PostData, PostService } from '../shared/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit, OnDestroy {
  newPostForm: FormGroup;
  userPostObservable: Observable<PostData>;
  userPostSubscription: Subscription;
  recentPostObservable: Observable<PostData>;
  recentPostSubscription: Subscription;

  constructor(
    private postService: PostService,
    private router: Router
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
    this.userPostObservable = this.postService.createNewPost(user.id, title, body);
    this.recentPostObservable = this.postService.createNewRecentPost(user.id, title, body);

    this.userPostSubscription = this.userPostObservable.subscribe(response => {
      console.log(response);
    })

    console.log('submitted')

    this.recentPostSubscription = this.recentPostObservable.subscribe(response => {
      console.log(response);
    })

    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    //this.userPostSubscription.unsubscribe();
    //this.recentPostSubscription.unsubscribe();
  }

}

