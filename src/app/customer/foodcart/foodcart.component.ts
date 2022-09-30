import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItems } from 'src/app/model/cart-items';
import { CustdataService } from 'src/app/service/custdata.service';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-foodcart',
  templateUrl: './foodcart.component.html',
  styleUrls: ['./foodcart.component.css']
})
export class FoodcartComponent implements OnInit {

  cartitems:Array<CartItems>;
  email:string;
  order:string;
  subtotal:any;
  checkmail:any;
  quantity:any;
  selectedItem:CartItems|any;
  action:string;
  totalamount:any;

  @Output()
  cartitemDeletedEvent = new EventEmitter();

  constructor(private restService:RestaurantServiceService,private dataservice:CustdataService,
    private router:Router,private activedRoute: ActivatedRoute) {
    this.dataservice.currentMessage.subscribe(message => this.email = message);
    this.dataservice.total.subscribe(message=>this.subtotal=message);
    this.checkmail=localStorage.getItem("email");
   }

  ngOnInit(): void {
    this.getFoodCartDetails();
    //this.totalamount=0;
  }

  getFoodCartDetails()
  {
    this.restService.showCart(this.checkmail).subscribe(resp=>{
      console.log(resp);
      this.cartitems=resp;
      //this.totalamount=this.totalamount+this.subtotal;
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
          this.selectedItem = this.cartitems.find(book => {
            return book.cartid === +id;
          });
        }
      }
    );
  }
  deletefromcart(itemid:any)
  {
    console.log(itemid)
    this.restService.deleteItemfromCart(this.checkmail,itemid).subscribe(res=>{
      console.log(res);
      this.getFoodCartDetails();
      alert("item deleted");
    },
    err=>{console.log(err)});
    console.log(this.email);
    this.cartitemDeletedEvent.emit();
  }

  clearcart()
  {
    this.restService.clearcart(this.checkmail).subscribe(res=>{
      console.log(res);
      this.getFoodCartDetails();
      alert("cart cleared");
    },err=>{console.log(err)});
  }

  placeorder()
  {
    alert("order placed successfully clearing the cart");
    this.clearcart();
    this.order="Order Placed Successfully";
    //this.totalamount=this.totalamount;
  }

  updateItem(id:number)
  {
    this.selectedItem = new CartItems();
    this.router.navigate(['customer', 'foodcart'], { queryParams: {id, action: 'update' } });
  }
}
