import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMenuMobileComponent } from './button-menu-mobile.component';

describe('ButtonMenuMobileComponent', () => {
  let component: ButtonMenuMobileComponent;
  let fixture: ComponentFixture<ButtonMenuMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonMenuMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
