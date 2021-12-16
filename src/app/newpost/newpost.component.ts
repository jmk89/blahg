import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { User } from './../user/user.model';
import { PostData, PostService } from './../services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit, OnDestroy {
  newPostForm: FormGroup;
  postObservable: Observable<PostData>;

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
    const user: User = JSON.parse(localStorage.getItem('userData'));
    this.postObservable = this.postService.createNewPost(user.id, title, body);

    this.postObservable.subscribe(response => {
      console.log(response);
      this.router.navigate(['/myprofile']);
    })

  }

  ngOnDestroy(): void {
    
  }

}

