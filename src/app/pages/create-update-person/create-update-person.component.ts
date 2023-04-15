import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Person } from '../../models/Person';
import { PersonService } from '../../services/personService/person.service';
import { US_STATES } from '../../models/usStates';

@Component({
  selector: 'app-create-update-person',
  templateUrl: './create-update-person.component.html',
  styleUrls: ['./create-update-person.component.scss']
})
export class CreateUpdatePersonComponent implements OnInit {
  title: string = '';
  buttonLabel: string = '';
  personForm!: FormGroup;
  id: number = 0;
  states = US_STATES;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly personService: PersonService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.title = this.id ? 'Edit Person' : 'Add Person';
    this.buttonLabel = this.id ? 'Update' : 'Create';

    this.personForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
    });

    if (this.id) {
      this.personService.getPeople(this.id).subscribe(
        (person: Person[]) => {
          this.personForm.patchValue(person);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      const person: Person = this.personForm.value;
      if (this.id) {
        person.id = this.id;
        this.personService.updatePerson(person).subscribe(() => {
          this.router.navigate(['/people']);
        });
      } else {
        this.personService.createPerson(person).subscribe(() => {
          this.router.navigate(['/people']);
        });
      }
    }
  }
}
