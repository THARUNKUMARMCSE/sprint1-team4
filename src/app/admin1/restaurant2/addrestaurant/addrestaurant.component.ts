import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.component.html',
  styleUrls: ['./addrestaurant.component.css']
})
export class AddrestaurantComponent implements OnInit {

  @Input()
  restaurant:Restaurant;
  @Output()
  restAddedEvent = new EventEmitter();

  constructor(private router:Router,private restService :RestaurantServiceService) { }

  ngOnInit(): void {
  }

  saveRest() {
    this.restService.addRestaurant(this.restaurant).subscribe(
      (book) => {
        alert("restaurant added");
        this.restAddedEvent.emit();
        this.router.navigate(['admin', 'restaurant2']);
      }
    );
  }

}
