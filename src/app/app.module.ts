import { DropdownDirective } from './shared/dropdown.directive';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MyprofileComponent } from './user-profile/myprofile.component';
import { NewpostComponent } from './newpost/newpost.component';
import { PreferencesComponent } from './user-profile/preferences/preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    UserHeaderComponent,
    AboutComponent,
    HomeComponent,
    MyprofileComponent,
    NewpostComponent,
    DropdownDirective,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    DropdownDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
