import { Subscription } from 'rxjs';
import { UserPreferencesService } from './../../shared/services/user-preferences.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit, OnDestroy {
  userPreferences: FormGroup;
  sub: Subscription;

  constructor(private userPreferencesService: UserPreferencesService) { }

  ngOnInit(): void {
    this.userPreferences = new FormGroup({
      'displayName' : new FormControl(null, [Validators.minLength(3), Validators.maxLength(16)]),
      'publicEmail': new FormControl(true, Validators.required),
      'bio': new FormControl(null, Validators.maxLength(800)),

    })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  onSubmit() {
    const displayName = this.userPreferences.controls['displayName'].value;
    const publicEmail = this.userPreferences.controls['publicEmail'].value;
    const bio = this.userPreferences.controls['bio'].value;

    this.sub = this.userPreferencesService.saveFormPreferences(displayName, publicEmail, bio).subscribe();
  }

}
