import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-updaterestaurant',
  templateUrl: './updaterestaurant.component.html',
  styleUrls: ['./updaterestaurant.component.css']
})
export class UpdaterestaurantComponent implements OnInit {

  @Input()
  restaurant:Restaurant;
  @Output()
  restUpdatedEvent = new EventEmitter();

  constructor(private router:Router,private restService :RestaurantServiceService) { }

  ngOnInit(): void {
  }

  updateRest() {
    this.restService.updateRestaurant(this.restaurant.restaurantId,this.restaurant).subscribe(
      (book) => {
        alert("restaurant updated");
        this.restUpdatedEvent.emit();
        this.router.navigate(['admin', 'restaurant2']);
      }
    );
  }

}
