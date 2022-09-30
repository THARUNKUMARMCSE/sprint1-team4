import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-restaurant2',
  templateUrl: './restaurant2.component.html',
  styleUrls: ['./restaurant2.component.css']
})
export class Restaurant2Component implements OnInit {
  restaurants:Array<Restaurant>;
  action: string;
  selectedRestaurant: Restaurant|any;

  constructor(private restService:RestaurantServiceService,private activedRoute: ActivatedRoute,private router:Router) { }

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
            return book.restaurantId=== +id;
          });
        }
      }
    );
  }

  deleteRestaurant(restaurantid:number)
  {
    this.restService.deleteRestaurant(restaurantid).subscribe(res=>{
      console.log(res);
      this.getRestaurantDetails();
      alert("restaurant deleted");
    },err=>{console.log(err)});
  }

  updateRestaurant(id:number)
  {
    this.selectedRestaurant = new Restaurant();
    this.router.navigate(['admin', 'restaurant2'], { queryParams: { id,action: 'update' } });
  }

  addRestaurant() {
    this.selectedRestaurant = new Restaurant();
    this.router.navigate(['admin', 'restaurant2'], { queryParams: { action: 'add' } });
  }

}
