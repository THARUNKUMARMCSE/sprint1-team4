import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.css']
})
export class AllRestaurantsComponent implements OnInit {

  restaurants: Array<Restaurant>=[];
  action: string='';
  selectedRestaurant: Restaurant|any;
  constructor(private route:Router,private restService: RestaurantServiceService, private activedRoute: ActivatedRoute) { 
    this.getRestaurantDetails();
  }

  ngOnInit(): void {
  
    /*this.restService.findAll().subscribe(data => {
      this.restaurants = data;
    });*/
    this.refreshData();
  }

  getRestaurantDetails()
  {
    this.restService.findAll().subscribe(resp=>{
      console.log(resp);
      this.restaurants=resp;
    },
    err=>{
      console.log(err);
    })
  }
  handleSuccessfulResponse(response:any) {
    this.restaurants = response;
  }

  
  viewItem(id: number) {
    this.route.navigate(['customer','allrestaurants'], { queryParams: { id, action: 'view' } });
  }

  refreshData()
   {
    this.restService.findAll().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
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

}
