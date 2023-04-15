import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../models/Person';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'https://crudcrud.com/api/b5132150d5b6415f91ece649b7140e4d';

  constructor(private http: HttpClient) { }

  getPeopleList(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}/people`).pipe(
      map((people: Person[]) => people)
    );
  }


  getPerson(id: any): Observable<Person[]> {
    const url = `${this.baseUrl}/people`;
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Person[]>(url, { params });
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.baseUrl}/people`, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseUrl}/people/${person._id}`, person);
  }

  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/people/${id}`);
  }
}
