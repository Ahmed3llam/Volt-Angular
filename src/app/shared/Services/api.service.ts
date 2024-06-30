import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService implements OnInit {
  private baseUrl = environment.baseUrl;
  header_object: HttpHeaders|undefined ;
  constructor(private http: HttpClient) {}


  ngOnInit(): void {
     let token=localStorage.getItem('token') || '';
     this.header_object = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  get<T>(url: string) {
    return this.http.get<T>(this.baseUrl + url);
  }

  getPagination<T>(url: string ,page: number = 0, pageSize: number = 0) {
    return this.http.get<T>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`,{headers: this.header_object});
  }

  post<T, R>(url: string, data: R) {
    return this.http.post<T>(this.baseUrl+ url, data,{headers: this.header_object});
  }

  put<T, R>(url: string, data: R) {
    return this.http.put<T>(this.baseUrl + url, data,{headers: this.header_object});
  }

  delete<T>(url: string) {
      return this.http.delete<T>(this.baseUrl + url,{headers: this.header_object});
  }
}
