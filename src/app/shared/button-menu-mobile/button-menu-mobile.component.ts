import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-menu-mobile',
  templateUrl: './button-menu-mobile.component.html',
  styleUrls: ['./button-menu-mobile.component.scss']
})
export class ButtonMenuMobileComponent {
  @Output() menuClicked = new EventEmitter<boolean>();
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuClicked.emit(this.menuOpen);
  }

}
