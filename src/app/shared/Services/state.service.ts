import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IState } from '../models/IState';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private baseUrl = 'http://localhost:5247/api/Government'; 

  constructor(private http: HttpClient) {}

  getGovernments(): Observable<IState[]> {
    return this.http.get<{ $id: string; $values: IState[] }>(this.baseUrl)
      .pipe(
        map(response => response.$values) 
      );
  }

 
  getGovernmentById(id: number): Observable<IState> {
    return this.http.get<IState>(`${this.baseUrl}/${id}`);
  }

  

  addNewGovernment(state: IState) : Observable<IState>{
    return this.http.post<IState>(this.baseUrl , state);
  }

  editGovernment(id: number, state: IState): Observable<IState> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<IState>(url, state);
  }
  
  deleteGovernment(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
