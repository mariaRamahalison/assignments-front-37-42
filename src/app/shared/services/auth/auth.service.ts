import { Injectable } from '@angular/core';
import { User } from '../../model/user.dto';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  uri_api = 'http://localhost:8010/api';

  constructor(private http: HttpClient, private router: Router) { }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.uri_api}/user/login`, user).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.uri_api}/user`, user).pipe(
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
    const isUserAdminPromise = new Promise((resolve, reject) => {
      this.isConnected().then((user:any)=>{
        if(user){
          const userJSON = JSON.parse(user);
          if(userJSON.type === 'admin'){
            resolve(true);
          }else{
            this.router.navigate(['**']);
            resolve(false);
          }
        }else{
          this.router.navigate(['/auth/login']);
          resolve(false);
        }
      })
    });
    return isUserAdminPromise;
  }

  isConnected(){
    const isConnected = new Promise((resolve, reject) => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
       resolve(user)
      } else {
        this.router.navigate(['/auth/login']);
        resolve(false);
      }
    });
    return isConnected;
  }

  isNotConnected(){
    const isConnected = new Promise((resolve, reject) => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (!user || !token) {
       resolve(true)
      } else {
        this.router.navigate(['/']);
        resolve(false);
      }
    });
    return isConnected;
  }
}
