import { AuthService } from './../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from '../shared/models/auth-user.model';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input('user') user: AuthUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onLogout() {
    this.authService.logout();
  }

}
