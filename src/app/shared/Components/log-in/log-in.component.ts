import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../Services/account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginData } from '../../Models/loginData';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent{

  isValid=true
  errorMessageService: any;
  showPassword=false


  constructor(private apiService:ApiService,private router:Router){}


  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })



  login(){

    const data:loginData={
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!

    }



    this.apiService.post<any,loginData>('/Account/Login',data).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.user.token);
        localStorage.setItem('userID', res.user.userID);
        localStorage.setItem('userName', res.user.userName);
        localStorage.setItem('role', res.user.role);
        this.router.navigate(['/employee/dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    })

  }


}
