import { Inject, Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  baseUrl: string;
  constructor() {
    this.baseUrl = environment.baseURL;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({ url: `${this.baseUrl}${request.url}` });
    return next.handle(apiReq);
  }
}
