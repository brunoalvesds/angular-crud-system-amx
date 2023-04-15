import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

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
  @ViewChild('alertModal', { static: true }) alertModal!: TemplateRef<any>;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
      return;
    }
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
            this.router.navigate(['/sign-in']);
          } else {
            this.errorMessage = 'Registration failed';
            this.dialog.open(this.alertModal);
          }
        }
      );
  }
}
