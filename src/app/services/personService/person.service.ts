import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Person } from '../../models/Person';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get a list of people and return as observable of Person array
  getPeopleList(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}/people`).pipe(
      map((people: Person[]) => people)
    );
  }

  // Get a single person by id and return as observable of Person array
  getPerson(id: any): Observable<Person[]> {
    const url = `${this.baseUrl}/people/` + id.toString();
    return this.http.get<Person[]>(url, {});
  }

  // Create a new person and return as observable of Person
  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.baseUrl}/people`, person);
  }

  // Update an existing person and return as observable of Person
  updatePerson(person: Person): Observable<Person> {
    const body = {
      "email": person.email,
      "firstName": person.firstName,
      "lastName": person.lastName,
      "phone": person.phone,
      "state": person.state
    }
      // Make PUT request to update person by id and return updated person as observable
    return this.http.put<Person>(`${this.baseUrl}/people/${person._id}`, body, {});
  }

  deletePerson(id: string): Observable<void> {
    // Delete a person by id and return as observable
    return this.http.delete<void>(`${this.baseUrl}/people/${id}`);
  }
}
