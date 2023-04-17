import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Person } from '../../models/Person';
import { PersonService } from '../../services/personService/person.service';
import { US_STATES } from '../../models/usStates';

@Component({
  selector: 'app-create-update-person',
  templateUrl: './create-update-person.component.html',
  styleUrls: ['./create-update-person.component.scss'],
  providers: [MatDialogConfig],
})
export class CreateUpdatePersonComponent implements OnInit {
  title: string = '';
  buttonLabel: string = '';
  personForm!: FormGroup;
  id: string = '';
  states = US_STATES;
  hasChanged: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly personService: PersonService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.title = this.id ? 'Edit Person' : 'Add Person';
    this.buttonLabel = this.id ? 'Update' : 'Create';

    this.personForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      state: ['', Validators.required],
    });

    if (this.id) {
      this.personService.getPerson(this.id).subscribe(
        (person: Person[]) => {
          this.personForm.patchValue(person); // Pre-populate form fields with person's current data
        },
        error => {
          this.displayError('error');
        }
      );
    }

    // Listen for changes to form values
    this.personForm.valueChanges.subscribe(() => {
      this.hasChanged = true;
    });
  }

  onSubmit(): void {
    if (this.personForm.valid && this.hasChanged) {
      const person: Person = this.personForm.value;
      if (this.id) {
        person._id = this.id;
        this.personService.updatePerson(person).subscribe(
          () => {
            this.router.navigate(['/people']);
          },
          error => {
            this.displayError(error.message);
          }
        );
      } else {
        this.personService.createPerson(person).subscribe(
          () => {
            this.router.navigate(['/people']);
          },
          error => {
            this.displayError(error.message);
          }
        );
      }
    } else if (!this.hasChanged) {
      alert('There are no changes to be saved.');
    } else {
      alert('Please fill out all required fields.');
    }
  }

  displayError(errorMessage: string): void {
    alert(errorMessage);
  }
}
