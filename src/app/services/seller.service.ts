import { EventEmitter, Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  issellerLoggedIn= new BehaviorSubject<boolean>(false);
  isloginError= new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(data:signUp){
   this.http.post('http://localhost:3000/seller',data
   ,{observe:'response'}).subscribe((result)=>{
    console.warn("response",result)// in this response have the seller signup dettails and another  response details like status
    if(result){
      this.issellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home']); 
    }
   })
  }
  reloadseller(){
    if(localStorage.getItem('seller')){
      this.issellerLoggedIn.next(true)
      this.router.navigate(['seller-home']); 

    }
  }
  Userlogin(data:login){
    // console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body.length===1){
        this.isloginError.emit(false)
        localStorage.setItem('seller',JSON.stringify(result.body))
            this.router.navigate(['seller-home']);
      }
      else{
        console.warn("login failed")
        this.isloginError.emit(true)
      }
    })
  }
}
