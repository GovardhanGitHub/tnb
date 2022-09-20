import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpBackend,
} from "@angular/common/http";

import { environment } from "../environments/environment";

import {
  NgbNavModule,
  NgbAccordionModule,
  NgbTooltipModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";

import { ExtrapagesModule } from "./extrapages/extrapages.module";

import { LayoutsModule } from "./layouts/layouts.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initFirebaseBackend } from "./authUtils";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ErrorInterceptor } from "./core/helpers/error.interceptor";
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";
import { FakeBackendInterceptor } from "./core/helpers/fake-backend";
import { BaseUrlInterceptor } from "./core/helpers/base-url.interceptor";
import { ReservoirJwtInterceptor } from "./core/helpers/reservoir.jwt.interceptor";
import { ReservoirErrorInterceptor } from "./core/helpers/reservoir.error.interceptor";

// if (environment.defaultauth === "tn") {
//   // initFirebaseBackend(environment.firebaseConfig);
// } else if (environment.defaultauth === "firebase") {
//   initFirebaseBackend(environment.firebaseConfig);
// } else {
//   // tslint:disable-next-line: no-unused-expression
//   FakeBackendInterceptor;
// }

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

export function HttpLoaderFactory(handler: HttpBackend) {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: createTranslateLoader,
    //     deps: [HttpClient],
    //   },
    // }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),

    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    ScrollToModule.forRoot(),
    NgbModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },

    { provide: HTTP_INTERCEPTORS, useClass: ReservoirJwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ReservoirErrorInterceptor, multi: true },

    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: FakeBackendInterceptor,
    //   multi: true,
    // },
  ],
})
export class AppModule {}
