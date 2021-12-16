import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Blahg';
  posts = [
    { name: "Post 1", content: "the first few words", date: new Date("2021-12-01") },
    { name: "Post 2", content: "some intro words", date: new Date("2021-12-02") },
    { name: "Post 3", content: "a hot take woah", date: new Date("2021-12-03") },
    { name: "Post 4", content: "testing waters", date: new Date("2021-12-04") },
  ]

  userSub: Subscription;
  user: User;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user
      .subscribe(user => {
        this.user = user;
      });
    this.authService.autoLogin();
    
  }


}
