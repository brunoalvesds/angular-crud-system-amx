import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logOut();
  }
}
