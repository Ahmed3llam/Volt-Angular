import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private apiService:ApiService, private accountService:AccountService){}

  getroles(){
 this.apiService.get<any>('/Administration').subscribe({
  next:(res)=>{
    console.log(res);
  },
  error:(err)=>{
    console.log(err);
  }
 })
}





}
