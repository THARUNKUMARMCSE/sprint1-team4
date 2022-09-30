import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-allitems',
  templateUrl: './allitems.component.html',
  styleUrls: ['./allitems.component.css']
})
export class AllitemsComponent implements OnInit {

  items:Array<Item>;
  action: string='';
  selectedItem: Item|any;
  constructor(private restService:RestaurantServiceService,private route:Router,private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getItemsDetails();
  }

  getItemsDetails()
  {
    this.restService.getAllItems().subscribe(resp=>{
      console.log(resp);
      this.items=resp;
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
    this.selectedItem = this.items.find(book => {
      return book.itemid === +id;
    });
  }
      }
    );
  }

  viewRes(id: number) {
    this.route.navigate(['customer','allitems'], { queryParams: { id, action: 'view' } });
  }


}
