import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl = "/users"
  constructor(private http: HttpClient) { }

  findAllUsers() {
    return this.http.get(this.rootUrl + "/findAllUsers")
  }


  findAllRoles() {
    return this.http.get(this.rootUrl + "/findAllRoles")
  }



  assignReservoirToUser(body: any) {
    return this.http.post(this.rootUrl + "/updateUser", body)
  }


  addUser(body: any) {
    return this.http.post(this.rootUrl + "/register", body)
  }

  findMaintainerByName(body: any) {
    return this.http.post(this.rootUrl + "/findMaintainerByName", body)
  }


}



import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/api/login`);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }
}
