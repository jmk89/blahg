import { UserService, UserData } from './../../shared/services/user.service';
import { Observable } from 'rxjs';
import { UserPreferencesData, UserPreferencesService } from './../../shared/services/user-preferences.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit, OnDestroy {
  userPreferences: FormGroup;
  prefs$: Observable<UserPreferencesData>;
  prefs: UserPreferencesData;
  userData: UserData;

  constructor(
    private userPreferencesService: UserPreferencesService,
    private user: UserService) {
      this.userData = this.user.getLocalUserAuthData();
     }

  ngOnInit(): void {
    this.userPreferences = new FormGroup({
      'displayName' : new FormControl("", [Validators.minLength(3), Validators.maxLength(16)]),
      'publicEmail': new FormControl(true, Validators.required),
      'bio': new FormControl("", Validators.maxLength(800)),

    });

    this.prefs$ = this.userPreferencesService.readDBPrefs();

    this.prefs$
      .subscribe(res => {
        this.prefs = res;
        this.userPreferences.setValue(
          {
            displayName: this.prefs.displayName,
            publicEmail: this.prefs.publicEmail,
            bio: this.prefs.bio
          }
          );
      });

  }

  ngOnDestroy(): void {

  }

  onSubmit() {
    const displayName = this.userPreferences.controls['displayName'].value;
    const publicEmail = this.userPreferences.controls['publicEmail'].value;
    const bio = this.userPreferences.controls['bio'].value;

    const userPrefs: UserPreferencesData = {
      userID: this.userData.uid,
      displayName: displayName,
      publicEmail: publicEmail,
      bio: bio
    }
    this.userPreferencesService.updateUserPrefs(userPrefs);
  }

}
