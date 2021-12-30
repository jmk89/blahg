import { AuthService } from './../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from '../shared/models/auth-user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  username: string;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.username = this.user.getLocalUserData().displayName;
  }

  onLogout() {
    this.user.logout();
  }

}
