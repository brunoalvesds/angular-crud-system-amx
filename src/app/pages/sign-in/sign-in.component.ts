import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }

  signIn(): void {
    const isAuthenticated = this.authService.signIn(this.username, this.password);
    if (!isAuthenticated) {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
