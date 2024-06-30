import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'http://localhost:37667/api/Account/changePassword';
  constructor(private http: HttpClient) {}

  changePassword(passwordDTO: any): Observable<any> {
    return this.http.post(this.apiUrl, passwordDTO);
  }
}
