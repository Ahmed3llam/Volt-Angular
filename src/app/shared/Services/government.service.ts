import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Government } from '../models/government';

@Injectable({
  providedIn: 'root'
})
export class GovernmentService {

  private baseUrl = 'http://localhost:5247/api/Government'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getGovernments(): Observable<Government[]> {
    return this.http.get<{ $id: string; $values: Government[] }>(this.baseUrl)
      .pipe(
        map(response => response.$values) // Extract the values array
      );
  }
  getGovernmentById(id: number): Observable<Government> {
    return this.http.get<Government>(`${this.baseUrl}/${id}`);
  }
}
