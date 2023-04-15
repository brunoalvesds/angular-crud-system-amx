import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'https://crudcrud.com';

  constructor(private http: HttpClient) { }

  getPeople(id: any): Observable<Person[]> {
    const url = `${this.baseUrl}/people`;
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Person[]>(url, { params });
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
