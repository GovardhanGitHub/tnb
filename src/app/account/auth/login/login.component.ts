import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "../../../core/services/auth.service";
import { LoginResponseDto } from "../../../core/models/loginResponseDto";
import { AuthfakeauthenticationService } from "../../../core/services/authfake.service";

import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

import { environment } from "../../../../environments/environment";
import { ReservoirAuthService } from "src/app/core/services/reservoir-auth.service";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = "";
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private reservoirAuthService: ReservoirAuthService
  ) { }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["pqr", [Validators.required]],
      password: ["123", [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }



  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === "tn") {
        this.reservoirAuthService
          .login(this.f.email.value, this.f.password.value)
          .subscribe((res: LoginResponseDto) => {
            console.log("res ", res);

            if (res && res?.token) {

              let isAdmin = false;
              let isUser = false;

              res.authentication?.authorities?.forEach(auth => {
                if (auth?.authority == "ROLE_ADMIN")
                  isAdmin = true;
                if (auth?.authority == "ROLE_USER")
                  isUser = true;
              });

              if (isAdmin) {
                //redirect to admin page
                this.reservoirAuthService.setLoggeedInUser(res);
                this.router.navigate(["/dashboard"]);
                return;
              }

              if (isUser) {
                //redirect to admin page
                this.reservoirAuthService.setLoggeedInUser(res);
                this.router.navigate(["/selectedReservoirDashboard"]);
                return;
              }
            }

            (error) => {
              console.log(error);
              this.error = error ? error : "";
              alert(this.error)
            };
          });
      }
    }



    // if (environment.defaultauth === "firebase") {
    //   this.authenticationService
    //     .login(this.f.email.value, this.f.password.value)
    //     .then((res: any) => {
    //       this.router.navigate(["/dashboard"]);
    //     })
    //     .catch((error) => {
    //       this.error = error ? error : "";
    //     });
    // } else {
    //   this.authFackservice
    //     .login(this.f.email.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //       (data) => {
    //         this.router.navigate(["/dashboard"]);
    //       },
    //       (error) => {
    //         this.error = error ? error : "";
    //       }
    //     );
    // }

  }
}
