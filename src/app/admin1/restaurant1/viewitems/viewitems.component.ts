import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-viewitems',
  templateUrl: './viewitems.component.html',
  styleUrls: ['./viewitems.component.css']
})
export class ViewitemsComponent implements OnInit {

  @Input()
  restaurant: Restaurant;
  @Output()
  itemViewEvent = new EventEmitter();

  items:Array<Item>=[];

  constructor(private restservice:RestaurantServiceService,private route:Router) { }

  ngOnInit(): void {
    this.restservice.findItemsByRestaurant(this.restaurant.restaurantId).subscribe(
      resp=>{
        console.log(resp);
        this.items=resp;
        //this.itemViewEvent.emit();
        //this.route.navigate(['allrestaurants']);
      },
      err=>{
        console.log(this.restaurant);
        console.log(err);
      })
  }

  deleteItem(itemid :number) {
    this.restservice.deleteItemFromRestaurant(this.restaurant.restaurantId,itemid).subscribe(
      (book) => {
        alert("item deleted");
        this.itemViewEvent.emit();
        this.route.navigate(['admin', 'restaurant1']);
      }
    );
  }

}
