import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

     // ⏳ Wait until Firebase auth is initialized
    if (!auth.initialized()) {
        await auth.waitForAuthInit();
    }

    // ✅ Authenticated
    if (auth.user()) {
        return true;
    }

    // ❌ Not authenticated
    return router.createUrlTree(['/login']);
}
