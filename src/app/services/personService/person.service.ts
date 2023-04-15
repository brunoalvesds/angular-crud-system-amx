import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'https://crudcrud.com';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}/people`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.baseUrl}/people`, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseUrl}/people/${person.id}`, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/people/${id}`);
  }
}
