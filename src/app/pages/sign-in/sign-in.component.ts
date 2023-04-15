import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }

  signIn(): void {
    const isAuthenticated = this.authService.signIn(this.username, this.password);
    if (isAuthenticated) {
      // user is authenticated
      this.errorMessage = '';
      console.log(this.errorMessage);
      // navigate to home page or redirect to original URL
    } else {
      // user is not authenticated
      this.errorMessage = 'Invalid username or password';
      console.log(this.errorMessage);
    }
  }
}
