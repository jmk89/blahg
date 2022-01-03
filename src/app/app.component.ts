import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthUser } from './shared/models/auth-user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Blahg';
  userSub: Subscription;
  user: AuthUser;
  loggedIn: boolean;
  activeUrl: string;
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.isLoggedIn$.subscribe(
      (loggedIn) => (this.loggedIn = loggedIn)
    );
    // this.userService.userData$.subscribe();
  }

  ngOnChanges() {
    this.activeUrl = this.router.url;
  }
}
