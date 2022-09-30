import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { CustdataService } from 'src/app/service/custdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string='';
  password:string='';
  role:string='';
  custemail:string;

  roles:string[];

 
  constructor(private authService:AuthService , private route:Router,private dataservice :CustdataService) { 
    this.roles=['admin','user'];
  }

  user: User=new User();
  ngOnInit(): void {
    this.username='';
    this.password='';
  }

  login()
  {
    this.user.email=this.username;
    this.user.password=this.password;
    this.user.role=this.role;
    

    this.authService.login(this.user).subscribe(
      res=>{
        if(res==null)
        {
          alert("email or password wrong!");
          this.ngOnInit();
        }
        else
        {
          console.log("login successful" + res.email);
          this.dataservice.changeMessage(res.email);
          localStorage.setItem("token",res.token);
          localStorage.setItem("email",res.email);
          if(this.role=='user')
          {
            this.route.navigate(['/customer']);
          }

          if(this.role=='admin')
          {
            this.route.navigate(['/admin']);
          }
        }
      },
      err=>{
        alert("login failed");
        this.ngOnInit();
    })
  }
}
