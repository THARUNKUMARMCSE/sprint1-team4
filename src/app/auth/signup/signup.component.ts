import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { Customer } from 'src/app/model/customer';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email:string='';
  password:string='';
  firstname:string='';
  lastname:string='';
  phoneno:string='';
  address:Address=new Address();

  customer : Customer = new Customer();
  constructor(private authService:AuthService, private route:Router) { }

  ngOnInit(): void {
    this.email='';
    this.password='';
    this.firstname='';
    this.lastname='';
    this.phoneno='';
    this.address=new Address();
  }

  signup()
  {
    this.customer.email=this.email;
    this.customer.password=this.password;
    this.customer.firstname=this.firstname;
    this.customer.lastname=this.lastname;
    this.customer.phoneno=this.phoneno;
    this.customer.address.addressid=this.address.addressid;

    this.authService.signup(this.customer).subscribe(res=>{
      if(res==null)
      {
        alert("fail to register");
        this.ngOnInit();
      }
      else
      {
        console.log("registration successful");
        this.route.navigate(['/']);
      }
    },err=>{
      alert("user registration failed");
      this.ngOnInit();
    })
  }
}
