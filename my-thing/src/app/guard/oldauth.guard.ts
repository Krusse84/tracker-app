import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../services/oldauth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    //public authService: AuthService,
    //private router: Router,
    //private ngZone: NgZone,
    //private db: AngularFireDatabase
  ) {

   }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true

    const auth = getAuth();

    /*return new Promise<boolean>((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {

        if (user) {
          this.authService.googleUser = {
            name: user.displayName,
            email: user.email,
            uid: user.uid
          }

          this.db.database.ref('boats').child(user.uid).child('subscriptionStatus').get().then(x => {
            if (x.val() === 'active') {
                //Found subscriptionNode

                this.ngZone.run(() => {
                    return this.router.navigate(['map']);
                });
            }
            else {
                this.ngZone.run(() => {
                    return this.router.navigate(['stripe']);
                });
            }
        }).catch(x => {
            this.ngZone.run(() => {
                return this.router.navigate(['stripe']);
            });
        })
          //No need to sign in or update stripe subscription 
          return resolve(true);
        }

        this.ngZone.run(() => {
          return this.router.navigate(['sign-in']);
        });
      });
    })*/
  }
}