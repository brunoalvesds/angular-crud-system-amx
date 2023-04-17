import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: any = localStorage.getItem('currentUser');
  username: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.currentUser) {
      this.username = JSON.parse(this.currentUser).username;
    }
    console.log("username: ", this.username)
  }

}
