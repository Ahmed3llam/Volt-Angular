import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IState } from '../Models/IState';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private baseUrl = 'http://localhost:37667/api/Government';

  constructor(private http: HttpClient) {}


  getGovernments(): Observable<IState[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url).pipe(
      map(response => response.$values as IState[])
    );
  }


  getGovernmentById(id: number): Observable<IState> {
    return this.http.get<IState>(`${this.baseUrl}/${id}`);
  }


  addNewGovernment(state: IState) : Observable<IState>{
    const url = `${this.baseUrl}/add`;
    return this.http.post<IState>(url , state);
  }

  editGovernment(id: number, state: IState): Observable<IState> {
    const url = `${this.baseUrl}/edit/${id}`;
    return this.http.put<IState>(url, state);
  }

  deleteGovernment(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}
