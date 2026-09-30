import { RouterModule, Routes } from '@angular/router';
import { UserLoadedGuard } from './guard/user.guard';
import { authGuard } from './guard/auth.guard';
import { StripeComponent } from './components/stripe/stripe.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'stripe', component: StripeComponent, canActivate: [UserLoadedGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'map', component: MapComponent, canActivate: [authGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }