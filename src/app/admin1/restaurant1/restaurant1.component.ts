import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-restaurant1',
  templateUrl: './restaurant1.component.html',
  styleUrls: ['./restaurant1.component.css']
})
export class Restaurant1Component implements OnInit {

  restaurants: Array<Restaurant>=[];
  action: string='';
  selectedRestaurant: Restaurant|any;
  item:Item;
  
  constructor(private route:Router,private restService: RestaurantServiceService, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRestaurantDetails();
  }

  getRestaurantDetails()
  {
    this.restService.findAll().subscribe(resp=>{
      console.log(resp);
      this.restaurants=resp;
    },
    err=>{
      console.log(err);
    });

    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
	// get the parameter id. this will be the id of the book whose details 
	// are to be displayed when action is view.
	const id = params['id'];
	// if id exists, convert it to integer and then retrive the book from
	// the books array
  if (id) {
    this.selectedRestaurant = this.restaurants.find(book => {
      return book.restaurantId === +id;
    });
  }
      }
    );
  }


  viewItem(id: number) {
    this.route.navigate(['admin','restaurant1'], { queryParams: { id, action: 'view' } });
  }

  additem(id:number)
  {
    this.item = new Item();
    this.route.navigate(['admin','restaurant1'],{ queryParams: { id, action: 'add' }});
  }
}
