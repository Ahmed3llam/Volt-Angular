import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/Services/api.service';
import { Router } from '@angular/router';
import { IMerchantDTO } from '../../../shared/Models/IMerchant';
import Swal from 'sweetalert2';
import { MerchantService } from './../../../shared/Services/merchant.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrl: './merchant-list.component.css'
})
export class MerchantListComponent implements OnInit {

merchants:IMerchantDTO[]=[];

loading : boolean = false;

  constructor(private apiService:ApiService,private router:Router, private merchantService:MerchantService){}

  ngOnInit(): void {
    this.loading = true;
    this.merchantService.getAllMerchants().subscribe({
      next:(res)=>{
        console.log(res);
       // this.merchants=res
       this.merchants=res;
       this.loading = false;
      },
      error:(err)=>{
        console.log(err)
        this.loading = false;
      }
    })
    // this.apiService.get<any>('/Merchant').subscribe({
    //   next:(res)=>{
    //       console.log(res);
    //    // this.merchants=res
    //    this.merchants=this.merchantsForTest;
    //    this.loading = false;
    //   },
    //   error:(err)=>{
    //     Swal.fire(
    //       'عرض !',
    //       'حدث خطأ في عرض التجار',
    //       'error'
    //     );
    //     console.log(err)
    //     this.loading = false;
    //   }
    // })
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
