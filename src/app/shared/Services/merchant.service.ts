import { Injectable ,OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './environment';
import { IMerchantDTO } from '../Models/IMerchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService implements OnInit {
  baseUrl: string = `${environment.baseUrl}/Merchant`;
  header_object: HttpHeaders|undefined ;
  token:string =  '';
  constructor(private http: HttpClient,private router:Router) {
  }

  getAllMerchants(): Observable<IMerchantDTO[]> {
    return this.http.get<IMerchantDTO[]>(`${this.baseUrl}`);
  }

  addMerchant(newMerchant: IMerchantDTO): Observable<IMerchantDTO> {
    return this.http.post<IMerchantDTO>(`${this.baseUrl}/AddMerchant`, newMerchant);
  }

  getMerchantById(id: string): Observable<IMerchantDTO> {
    return this.http.get<IMerchantDTO>(`${this.baseUrl}/GetMerchantById/${id}`);
  }

  updateMerchant(newData: IMerchantDTO): Observable<IMerchantDTO> {
    return this.http.put<IMerchantDTO>(`${this.baseUrl}/UpdateMerchant`, newData);
  }

  updateStatus(id: string, status: boolean): Observable<IMerchantDTO> {
    return this.http.put<IMerchantDTO>(`${this.baseUrl}/UpdateStatus`, { id, status });
  }

  deleteMerchant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteMerchant/${id}`);
  }

  ngOnInit(): void {
      this.token=localStorage.getItem('token') || '';
   this.header_object = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

   console.log(this.header_object);
  }




















}
