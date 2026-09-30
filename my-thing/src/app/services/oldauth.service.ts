
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnDestroy {
    public hasActiveSubscription: boolean = false;
    public googleUser: any;

    constructor(
        //public afAuth: AngularFireAuth,
        public ngZone: NgZone,
        public router: Router
    ) {
    }

    private destroyed = new Subject<void>();
    public subscription = Subscription.EMPTY;

    // Sign in with Google
    GoogleAuth() {

        /*this.afAuth.signInWithPopup(new GoogleAuthProvider).then(user => {
            if (user) {
                this.ngZone.run(() => {
                    return this.router.navigate(['map']);
                });
            }

            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        });*/
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }


}