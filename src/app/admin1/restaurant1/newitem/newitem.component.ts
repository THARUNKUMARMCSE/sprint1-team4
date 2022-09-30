import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-newitem',
  templateUrl: './newitem.component.html',
  styleUrls: ['./newitem.component.css']
})
export class NewitemComponent implements OnInit {

  @Input()
  restaurant:Restaurant;
  @Output()
  addItemEvent =new EventEmitter();
  @Input()
  item:Item;

  constructor(private router:Router,private restService :RestaurantServiceService) { }

  ngOnInit(): void {
  }

  saveItem() {
    this.restService.addItemtoRestaurant(this.restaurant.restaurantId,this.item).subscribe(
      (item) => {
        alert("item added to restaurant");
        this.addItemEvent.emit();
        this.router.navigate(['admin', 'restaurant1']);
      }
    );
  }


}
