import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.route.navigate(['/']);
  }

}
