import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    private readonly router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  private loadPeople(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.personService.getPeople(id).subscribe((people: Person[]) => {
      this.people = people;
    });
  }

  public editPerson(id: number): void {
    this.router.navigate(['/people', id, 'edit']);
  }

  public deletePerson(id: number): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }
}
