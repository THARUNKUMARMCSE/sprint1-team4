import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {

  @Input()
  customer: Customer;
  @Output()
  custAddedEvent = new EventEmitter();

  constructor(private router:Router,private restService:RestaurantServiceService) { }

  ngOnInit(): void {
  }

  saveCustomer()
  {
    this.restService.addCustomer(this.customer).subscribe(
      res=>{
        alert("customer added");
        this.custAddedEvent.emit();
        this.router.navigate(['admin', 'customerlist']);},
      err=>{console.log(err)});
  }

}
