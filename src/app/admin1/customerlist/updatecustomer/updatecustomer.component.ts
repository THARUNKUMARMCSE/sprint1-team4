import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {

  @Input()
  customer: Customer;
  @Output()
  custUpdatedEvent = new EventEmitter();


  constructor(private router:Router,private restService:RestaurantServiceService) { }

  ngOnInit(): void {
  }

  updateCustomer()
  {
    this.restService.updateCustomer(this.customer.customerid,this.customer).subscribe(
      res=>{
        alert("customer updated");
        this.custUpdatedEvent.emit();
        this.router.navigate(['admin', 'customerlist']);},
      err=>{console.log(err)});
  }

}
