import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor() {}

  login(email: string, password: string, role: string) {
    if (role != 'Fail') {
      this.isLoggedIn = true;
      this.isAdmin = role == 'Admin';
    }
    return this.isLoggedIn;
  }
}
