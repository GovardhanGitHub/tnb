import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthenticationService } from "../services/auth.service";
import { AuthfakeauthenticationService } from "../services/authfake.service";

import { environment } from "../../../environments/environment";
import { ReservoirAuthService } from "../services/reservoir-auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private reservoirAuthService: ReservoirAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (environment.defaultauth === "tn") {
      const currentUser = this.reservoirAuthService.currentUserValue;
      console.log(
        "🚀 ~ file: auth.guard.ts ~ line 23 ~ AuthGuard ~ canActivate ~ currentUser",
        currentUser
      );

      if (currentUser) {
        // logged in so return true
        return true;
      }
      // else if (environment.defaultauth === 'firebase') {
      //     const currentUser = this.authenticationService.currentUser();
      //     if (currentUser) {
      //         // logged in so return true
      //         return true;
      //     }
      // } else {
      //     const currentUser = this.authFackservice.currentUserValue;
      //     if (currentUser) {
      //         // logged in so return true
      //         return true;
      //     }
    }
    // not logged in so redirect to login page with the return url

    this.router.navigate(["/account/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
