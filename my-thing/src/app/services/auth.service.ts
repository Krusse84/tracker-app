import { inject, Injectable, NgZone } from '@angular/core';
import {
    Auth,
    browserSessionPersistence,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    user,
    User,

} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { setPersistence, signInWithRedirect } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user$: Observable<User | null>;
    ngZone = inject(NgZone);
    router = inject(Router)

    constructor(private firebaseAuth: Auth) {
        this.setSessionStoragePersistence();
        this.user$ = user(this.firebaseAuth);
    }

    private setSessionStoragePersistence(): void {
        setPersistence(this.firebaseAuth, browserSessionPersistence);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(() => {
            //
        });
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth).then(() => {
            sessionStorage.clear();
            this.router.navigate(['sign-in']);
        });

        return from(promise);
    }

    async googleLogin(): Promise<void> {
        const provider = new GoogleAuthProvider();
        try {
            this.ngZone.run(async x => {
                const result = await signInWithPopup(this.firebaseAuth, provider);

                const user = (result as any).user;

                if (user) {
                    return this.router.navigate(['map']);
                }

                return this.router.navigate(['sign-in']);

            });

            if (!user) {
                throw new Error('Google-Login error');
            }
        } catch (error) {
            console.error('Google-Login error:', error);
            throw error;
        }
    }
}