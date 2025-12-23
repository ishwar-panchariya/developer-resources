import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '../firebase';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly user = signal<User | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    constructor(private router: Router) {
        // 🔥 Keep user state in sync with Firebase
        onAuthStateChanged(auth, user => {
            this.user.set(user);
        });
    }

    async login(email: string, password: string) {
        this.loading.set(true);
        this.error.set(null);

        try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        this.user.set(cred.user);
        this.router.navigate(['/resources']);
        } catch (err: any) {
        this.error.set(this.mapAuthError(err.code));
        } finally {
        this.loading.set(false);
        }
    }

    async register(email: string, password: string) {
        this.loading.set(true);
        this.error.set(null);

        try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        this.user.set(cred.user);
        this.router.navigate(['/resources']);
        } catch (err: any) {
        this.error.set(this.mapAuthError(err.code));
        } finally {
        this.loading.set(false);
        }
    }

    async logout() {
        await signOut(auth);
        this.user.set(null);
        this.router.navigate(['/login']);
    }

    private mapAuthError(code: string): string {
        switch (code) {

            // 🔐 Login & Signup
            case 'auth/invalid-credential':
            case 'auth/invalid-login-credentials':
            return 'Invalid email or password';

            // 🆕 Signup specific
            case 'auth/email-already-in-use':
            return 'An account with this email already exists. Please sign in instead';

            case 'auth/weak-password':
            return 'Password should be at least 6 characters long';

            // 📧 Validation
            case 'auth/invalid-email':
            return 'Please enter a valid email address';

            // 🚫 Account state
            case 'auth/user-disabled':
            return 'This account has been disabled';

            case 'auth/too-many-requests':
            return 'Too many attempts. Please try again later';

            default:
            return 'Something went wrong. Please try again';
        }
    }

}
