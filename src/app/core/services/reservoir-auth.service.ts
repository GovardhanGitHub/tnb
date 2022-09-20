import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginResponseDto } from "../models/loginResponseDto";

@Injectable({
  providedIn: "root",
})
export class ReservoirAuthService {
  private currentUserSubject: BehaviorSubject<LoginResponseDto>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponseDto>(
      JSON.parse(localStorage.getItem("authUser"))
    );
  }

  login(username: string, password: string) {
    let loginUrl = "/users/authenticate";
    return this.http.post<any>(loginUrl, { username, password });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.setItem("authUser", null);
    this.currentUserSubject.next(null);
  }

  setLoggeedInUser = (user) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    this.currentUserSubject.next(user);
  };




  public get currentUserValue(): LoginResponseDto {
    return this.currentUserSubject.value;
  }
}
