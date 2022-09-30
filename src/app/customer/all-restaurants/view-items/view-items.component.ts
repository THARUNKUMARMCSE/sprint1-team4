import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { Restaurant } from 'src/app/model/restaurant';
import { CustdataService } from 'src/app/service/custdata.service';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  @Input()
  restaurant: Restaurant;
  @Output()
  itemViewEvent = new EventEmitter();

  items:Array<Item>=[];
  email:string;
  quant:string;
  checkmail:any;
  constructor(private restservice:RestaurantServiceService,private route:Router,private dataservice :CustdataService) { }

  ngOnInit(): void {
    this.checkmail=localStorage.getItem("email");
    this.dataservice.currentMessage.subscribe(message => this.email = message)
    this.restservice.findItemsByRestaurant(this.restaurant.restaurantId).subscribe(
      resp=>{
        this.itemViewEvent.emit();
        console.log(resp);
        this.items=resp;
        //this.route.navigate(['allrestaurants']);
      },
      err=>{
        console.log(this.restaurant);
        console.log(err);
      })
  }

  addtoCart(itemid:number)
  {
    console.log(itemid);
    console.log(this.email);
    this.restservice.addtoCart(this.checkmail,itemid,1).subscribe(quant=>{
      console.log(quant);
      this.dataservice.changeTotal(quant);
      alert("item added to cart");
      this.itemViewEvent.emit();
      this.route.navigate(['customer','allrestaurants']);
    },
    err=>{
      console.log(err);
    });
  }

}
