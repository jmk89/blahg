import { UserPreferencesData, UserPreferencesService } from './../shared/services/user-preferences.service';
import { AuthService } from './../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from '../shared/models/auth-user.model';
import { UserService } from '../shared/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  prefs$: Observable<UserPreferencesData>

  constructor(
    private user: UserService,
    private prefs: UserPreferencesService
    ) {
      this.prefs$ = this.prefs.updateLocalStorageWithDBPrefs(this.user.getLocalUserAuthData().uid);
     }

  ngOnInit(): void {

  }

  onLogout() {
    this.user.logout();
  }

}
