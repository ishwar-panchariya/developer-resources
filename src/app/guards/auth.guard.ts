import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

     // ⏳ While Firebase is initializing → allow navigation
    if (!auth.initialized()) {
        return true;
    }

    // ✅ Authenticated
    if (auth.user()) {
        return true;
    }

    // ❌ Not authenticated
    return router.createUrlTree(['/login']);
}
