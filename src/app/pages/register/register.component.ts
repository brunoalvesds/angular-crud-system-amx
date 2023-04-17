import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, public location: Location) { }

  // Method to handle registration
  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
      alert(this.errorMessage);
      return;
    }

    // Call register method of AuthService and handle response
    this.authService.register(this.username, this.password)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      )
      .subscribe(
        (result: any) => {
          if (result) {
            this.router.navigate(['/sign-in']).then(() => {
              // reload the current location to refresh the page
              this.location.replaceState('/sign-in');
              window.location.reload();
            });
          } else {
            this.errorMessage = 'Registration failed';
            alert(this.errorMessage);
          }
        }
      );
  }
}
