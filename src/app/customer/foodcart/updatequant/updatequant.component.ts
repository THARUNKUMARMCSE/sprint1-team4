import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from 'src/app/model/cart-items';
import { CustdataService } from 'src/app/service/custdata.service';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-updatequant',
  templateUrl: './updatequant.component.html',
  styleUrls: ['./updatequant.component.css']
})
export class UpdatequantComponent implements OnInit {
  @Input()
  cartitem:CartItems;

  @Output()
  cartEvent= new EventEmitter();

  email:any;
  constructor(private restService:RestaurantServiceService,private router:Router,private dataservice:CustdataService) { 
    this.email=localStorage.getItem("email");
  }

  ngOnInit(): void {
  }

  updateItem()
  {
    this.restService.updatequantity(this.email,this.cartitem.item.itemid,this.cartitem.quantity).subscribe(
      (item) => {
        alert("quantity updated");
        this.dataservice.changeTotal(item);
        this.cartEvent.emit();
        this.router.navigate(['customer', 'foodcart']);
      }
    );
  }

}
