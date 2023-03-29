import { Component,OnInit } from '@angular/core';
import { signUp } from '../data-type';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showlogin:boolean=true; 
  autherror:string="";
  constructor(private serve:SellerService){}
  ngOnInit():void{
    this.serve.reloadseller()
  }
  signup(data:signUp):void{
    console.warn("signup data",data)
    this.serve.userSignUp(data)
    
  }
  login(data:signUp){
    console.warn("login data",data)
    this.serve.Userlogin(data)
    this.serve.isloginError.subscribe((iserror)=>{
      if(iserror)
      {
        this.autherror="Email or Password Is Incorrect !"
      }
    })
  }
  openlogin(){
    this.showlogin=true
  }
  opensignup(){
    this.showlogin=false
  }

}