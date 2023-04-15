import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor() { }

  signIn(username: string, password: string): boolean {
    // You would normally make a network request to authenticate the user with the server
    // but for this example, we'll just do a simple check on the username and password.
    if (username === 'user' && password === 'password') {
      this.authenticated = true;
      return true;
    } else {
      this.authenticated = false;
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  signOut(): void {
    this.authenticated = false;
  }
}
