import { Injectable ,OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MerchantService implements OnInit {
  baseUrl: string = 'http://localhost:5247/api';
  header_object: HttpHeaders|undefined ;
  token:string =  '';
  constructor(private http: HttpClient,private router:Router) {
  }


  ngOnInit(): void {
      this.token=localStorage.getItem('token') || '';
   this.header_object = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

   console.log(this.header_object);
  }




















}
