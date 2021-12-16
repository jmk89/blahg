import { AuthService } from './../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input('user') user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.user);
  }

  onLogout() {
    this.authService.logout();
  }

}
