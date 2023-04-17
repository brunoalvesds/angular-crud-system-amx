import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl; // API URL
  private currentUserSubject: BehaviorSubject<any>; // Subject that holds the current user
  public currentUser: Observable<any>; // Observable that emits the current user
  private users: any[] = []; // Array to store registered users

  constructor(private router: Router, private http: HttpClient) {
    // Initialize the current user subject with the user object stored in local storage
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();

    // Get the registered users from the server and store them in the users array
    this.getUsers().subscribe(
      res => {
        this.users = res;
      }
    )
  }

  // Getter for the current user
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Function to get the registered users from the server
  getUsers() {
    return this.http.get(`${this.baseUrl}/register`).pipe(
      map((user: any) => user)
    );
  }

  // Function to sign in a user
  signIn(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password && u.username !== '' && u.password !== '');
    if (user) {
      // Set the current user subject and store the user object in local storage
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Navigate to the home page and return true to indicate that the user is authenticated
      this.router.navigate(['/home']);
      return true;
    } else {
      // Return false to indicate that the user is not authenticated
      return false;
    }
  }

  // Function to register a user
  register(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    // Send a POST request to the server to create a new user
    return this.http.post<any>(this.baseUrl + '/register', { username, password }, options);
  }

  // Function to log out the user
  logOut(): void {
    // Remove the current user object from local storage and set the current user subject to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // Navigate to the sign-in page
    this.router.navigate(['/sign-in']);
  }

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser !== null) {
        // Return true if the current user object is not null
        return true;
      }
    }
    // Return false if the current user object is null
    return false;
  }
}
