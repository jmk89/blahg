import { Subscription, Observable } from 'rxjs';
import { UserPreferencesData, UserPreferencesService } from './../../shared/services/user-preferences.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit, OnDestroy {
  userPreferences: FormGroup;
  prefs$: Observable<UserPreferencesData[]>;
  prefs: UserPreferencesData;
  userID;

  constructor(
    private userPreferencesService: UserPreferencesService,
    private authService: AuthService) {
      const userData = this.authService.getLocalUserData();
      this.userID = userData.id;
     }

  ngOnInit(): void {
    this.userPreferences = new FormGroup({
      'displayName' : new FormControl(null, [Validators.minLength(3), Validators.maxLength(16)]),
      'publicEmail': new FormControl(true, Validators.required),
      'bio': new FormControl(null, Validators.maxLength(800)),

    });

    this.prefs$ = this.userPreferencesService.getUserPreferences(this.userID);
    this.prefs$
      .subscribe(res => {
        this.prefs = res[0];
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
      userID: this.userID,
      displayName: displayName,
      publicEmail: publicEmail,
      bio: bio
    }

    this.userPreferencesService.updateUserPreferences(userPrefs)
      .subscribe(res => console.log(res));

    // this.sub = this.userPreferencesService.saveFormPreferences(displayName, publicEmail, bio).subscribe();
  }

}
