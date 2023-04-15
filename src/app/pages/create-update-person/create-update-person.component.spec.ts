import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePersonComponent } from './create-update-person.component';

describe('CreateUpdatePersonComponent', () => {
  let component: CreateUpdatePersonComponent;
  let fixture: ComponentFixture<CreateUpdatePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
