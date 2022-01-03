import { UserPreferencesData, UserPreferencesService } from './../shared/services/user-preferences.service';
import { Component, Input, OnInit } from '@angular/core';
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

     }

  ngOnInit(): void {
    this.prefs$ = this.prefs.readDBPrefs();
  }

  onLogout() {
    this.user.logout();
  }

}
