import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../model/category';
import { RestaurantServiceService } from '../service/restaurant-service.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  category:Array<Category>;
  action: string;
  selectedCat: Category|any;

  constructor(private route:Router,private restService:RestaurantServiceService,private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories()
  {
    this.restService.getAllCategories().subscribe(resp=>{
      console.log(resp);
      this.category=resp;
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
          this.selectedCat = this.category.find(book => {
            return book.catid === +id;
          });
        }
      }
    );
  }

  logout()
  {
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }

  viewme(id:number)
  {
    this.route.navigate(['customer'], { queryParams: { id, action: 'view' } });
  }

}
