import { PreferencesComponent } from './user-profile/preferences/preferences.component';
import { NewpostComponent } from './newpost/newpost.component';
import { MyprofileComponent } from './user-profile/myprofile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "profile",
    component: MyprofileComponent
  },
  {
    path: "preferences",
    component: PreferencesComponent
  },
  {
    path: "new",
    component: NewpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
