import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/Services/api.service';
import { Router } from '@angular/router';
import { IMerchantDTO } from '../../../shared/Models/IMerchant';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrl: './merchant-list.component.css'
})
export class MerchantListComponent implements OnInit {

merchants:IMerchantDTO[]=[];
merchantsForTest: IMerchantDTO[] = [
  {
      id: "1",
      name: "Alice's Store",
      email: "alice@example.com",
      phone: "123-456-7890",
      status: true,
      branchName: "Main Branch",
      role: "Owner",
      password: "password123",
      address: "123 Main St",
      government: "State Government",
      city: "Metropolis",
      pickUpSpecialCost: 10,
      refusedOrderPercent: 5,
  },
  {
      id: "2",
      name: "Bob's Market",
      email: "bob@example.com",
      phone: "234-567-8901",
      status: false,
      branchName: "Downtown Branch",
      role: "Manager",
      password: "password456",
      address: "456 Elm St",
      government: "Local Government",
      city: "Gotham",
      pickUpSpecialCost: 15,
      refusedOrderPercent: 10,
  },
  {
      id: "3",
      name: "Carol's Shop",
      email: "carol@example.com",
      phone: "345-678-9012",
      status: true,
      branchName: "Uptown Branch",
      role: "Supervisor",
      password: "password789",
      address: "789 Oak St",
      government: "Federal Government",
      city: "Star City",
      pickUpSpecialCost: 20,
      refusedOrderPercent: 8,
  },
  {
      id: "4",
      name: "Dave's Store",
      email: "dave@example.com",
      phone: "456-789-0123",
      status: false,
      branchName: "Suburban Branch",
      role: "Assistant",
      password: "password101",
      address: "101 Pine St",
      government: "Provincial Government",
      city: "Central City",
      pickUpSpecialCost: 12,
      refusedOrderPercent: 6,
  }
];

  constructor(private apiService:ApiService,private router:Router){}

  ngOnInit(): void {
    this.apiService.get<any>('/Merchant').subscribe({
      next:(res)=>{
          console.log(res);
       // this.merchants=res
       this.merchants=this.merchantsForTest;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  onSearch(searchText:string){
    this.apiService.get<any>('/Merchant/'+searchText).subscribe({
      next:(res)=>{
        console.log(res);
       // this.merchants=res
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  deleteMerchant(id:string|undefined){
    this.apiService.delete<any>('/Merchant/'+id).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }










}
