import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  signIn() {
    // emulate sign in with fixed token
    const token = 'fixed-token';
    localStorage.setItem('token', token);

    // navigate to home screen
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

}
