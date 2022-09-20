import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, timeout } from "rxjs/operators";

import { ReservoirAuthService } from "../services/reservoir-auth.service";

@Injectable()
export class ReservoirErrorInterceptor implements HttpInterceptor {
  constructor(
    private reservoirAuthService: ReservoirAuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.reservoirAuthService.logout();
          alert("authentication is failed!")
          setTimeout(() => {
            location.reload();
          }, 500);
        }

        const error = err?.error?.message || err?.statusText;
        return throwError(error);
      })
    );
  }
}
