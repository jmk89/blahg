import { PreferencesComponent } from './user-profile/preferences/preferences.component';
import { NewpostComponent } from './newpost/newpost.component';
import { MyprofileComponent } from './user-profile/myprofile.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home'])
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
    component: MyprofileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: "preferences",
    component: PreferencesComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  {
    path: "new",
    component: NewpostComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
