import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/oldauth.service';

@Injectable({
  providedIn: 'root'
})

export class UserLoadedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  canActivate(): boolean {
    if(this.authService.googleUser == null) {
      this.ngZone.run(() => {
        return this.router.navigate(['map']);
      });
    }

    return true
  }
    
  
}