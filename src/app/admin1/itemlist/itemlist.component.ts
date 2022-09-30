import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {

  items:Array<Item>;
  action: string;
  selectedItem: Item|any;
  constructor(private restService:RestaurantServiceService,private router:Router,private activedRoute: ActivatedRoute) {
    this.getItemsDetails();
   }

  ngOnInit(): void {
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

  addItem() {
    this.selectedItem = new Item();
    this.router.navigate(['admin', 'itemlist'], { queryParams: { action: 'add' } });
  }

  updateItem(id:number)
  {
    this.selectedItem = new Item();
    this.router.navigate(['admin', 'itemlist'], { queryParams: {id, action: 'update' } });
  }

}
