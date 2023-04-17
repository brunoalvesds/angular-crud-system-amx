import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Person } from '../../models/Person';
import { PersonService } from '../../services/personService/person.service';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.scss']
})
export class ListPeopleComponent implements OnInit {
  public people: Person[] = [];
  id: number = 0;

  constructor(
    private readonly personService: PersonService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    // Load list of people when component initializes
    this.loadPeople();
  }

  // Retrieve the list of people from the server
  loadPeople() {
    this.personService.getPeopleList().subscribe((people: Person[]) => {
      this.people = people;
    });
  }

  // Navigate to the edit person page
  public editPerson(id: string): void {
    this.router.navigate(['/people', id, 'edit']);
  }

  // Delete a person from the list
  public deletePerson(id: string): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe(() => {
        // Reload the list of people after the deletion
        this.loadPeople();
      });
    }
  }
}
