import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customers:Array<Customer>;
  action: string;
  selectedCustomer: Customer|any;

  constructor(private restService:RestaurantServiceService, private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers()
  {
    this.restService.getCustomers().subscribe(
    res=>{console.log(res);
          this.customers=res},
    err=>{console.log(err)});

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
          this.selectedCustomer = this.customers.find(book => {
            return book.customerid === +id;
          });
        }
      }
    );
  }

  deleteCustomer(custid:number)
  {
    this.restService.deleteCustomer(custid).subscribe(res=>{
      console.log(res);
      alert("customer deleted");
      this.getAllCustomers();
    },
      err=>{console.log(err)});
  }

  addCustomer() {
    this.selectedCustomer = new Customer();
    this.router.navigate(['admin', 'customerlist'], { queryParams: { action: 'add' } });
  }

  updateCustomer(id:number) {
    this.selectedCustomer = new Customer();
    this.router.navigate(['admin', 'customerlist'], { queryParams: { id,action: 'update' } });
  }

}
