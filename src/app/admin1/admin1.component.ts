import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin1',
  templateUrl: './admin1.component.html',
  styleUrls: ['./admin1.component.css']
})
export class Admin1Component implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }

}
