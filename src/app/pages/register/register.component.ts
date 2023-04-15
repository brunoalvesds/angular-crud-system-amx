import { Component } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router) { }

  register() {
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
            console.log('Registration successful');
            this.router.navigate(['/signin']);
          } else {
            console.error('Registration failed');
          }
        }
      );
  }
}
