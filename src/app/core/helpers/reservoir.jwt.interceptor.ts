import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/auth.service";
import { AuthfakeauthenticationService } from "../services/authfake.service";

import { environment } from "../../../environments/environment";

import { ReservoirAuthService } from "../services/reservoir-auth.service";

@Injectable()
export class ReservoirJwtInterceptor implements HttpInterceptor {
  baseUrl: string;

  constructor(private  reservoirAuthService : ReservoirAuthService) {
    this.baseUrl = environment.baseURL;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.reservoirAuthService.currentUserValue;

    if (currentUser?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log("🚀 ~ file: reservoir.jwt.interceptor.ts ~ line 37 ~ ReservoirJwtInterceptor ~ request", request)

    }

    return next.handle(request);
  }
}
