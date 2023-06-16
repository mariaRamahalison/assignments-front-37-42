import { Injectable } from '@angular/core';
import { User } from '../../model/user.dto';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  uri_api = 'http://localhost:8010/api';

  constructor(private http: HttpClient) { }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.uri_api}/user/login`, user).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  logIn() {
    console.log("ON SE LOGGE")
    this.loggedIn = true;
  }

  logOut() {
    console.log("ON SE DELOGGE")

    this.loggedIn = false;
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin() {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise((resolve, reject) => {
        resolve(this.loggedIn);
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }
}
