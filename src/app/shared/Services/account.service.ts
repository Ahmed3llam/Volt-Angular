import { ApiService } from './api.service';
import { Injectable ,OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginData } from '../Models/loginData';

import { Router } from '@angular/router';
import { IchangePassword } from '../Models/IchangePassword';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {

  baseUrl: string = 'http://localhost:5247/api';
  header_object: HttpHeaders|undefined ;
  token:string =  '';
  constructor(private apiService:ApiService,private http: HttpClient,private router:Router) {
  }

  ngOnInit(): void {
    this.token=localStorage.getItem('token') || '';
   this.header_object = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

   console.log(this.header_object);
  }


  // Login_Account( formData: loginData ): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/Account/Login`, formData);
  // }
  Login_Account(formData: loginData){
    this.apiService.post<any,loginData>('/Account/Login',formData).subscribe({
      next: (res) => {
        this.handleLogin(res);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  handleLogin( res: any ) {
    localStorage.setItem('token', res.user.token);
    localStorage.setItem('userID', res.user.userID);
    localStorage.setItem('userName', res.user.userName);
    localStorage.setItem('role', res.user.role);
    this.router.navigate(['/employee/dashboard']);
  }

  LogOut_Account( ): Observable<any> {
    return this.http.post(`${this.baseUrl}/Account/Logout`,{});
  }

  ChangePassword_Account( body: IchangePassword ): Observable<any> {
    return this.http.post(`${this.baseUrl}/Account/changePassword`, body);
  }


  test( ): Observable<any> {
    return this.http.get(`${this.baseUrl}/Administration`,{headers: this.header_object});
  }

}
