import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { User } from '../ViewModels/User';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private isUserLogged: BehaviorSubject<boolean>;

  constructor(
    private Router: Router,
    private location: Location,
    private httpClient: HttpClient
  ) {
    this.isUserLogged = new BehaviorSubject<boolean>(this.loggedStatus);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
    }),
  };

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.ApiLink}/User`,
      user,
      this.httpOptions
    );
  }

  login(email: string, password: string) {
    this.checkUser(email).subscribe((data: User[]) => {
      if (data.length != 0) {
        if (data[0].password == password) {
          localStorage.setItem('user', JSON.stringify(data[0]));
          this.isUserLogged.next(true);
        }
      }
    });
  }

  getUserName() {
    let userObj: any = localStorage.getItem('user');
    return JSON.parse(userObj).fullName;
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLogged.next(false);
  }

  get loggedStatus() {
    return localStorage.getItem('user') ? true : false;
  }

  getloggedSubject(): Observable<boolean> {
    return this.isUserLogged.asObservable();
  }

  checkUser(email: string) {
    return this.httpClient.get<[]>(
      `${environment.LiveGetApi}/User?email=${email}`
    );
  }
}
