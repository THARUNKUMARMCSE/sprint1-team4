import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Item } from 'src/app/model/item';
import { CustdataService } from 'src/app/service/custdata.service';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-itemsbycat',
  templateUrl: './itemsbycat.component.html',
  styleUrls: ['./itemsbycat.component.css']
})
export class ItemsbycatComponent implements OnInit {
  @Input()
  category:Category;
  @Output()
  itemViewEvent = new EventEmitter();

  email:string;
  checkmail:any;

  items:Array<Item>;
  constructor(private restService:RestaurantServiceService,private route:Router,private dataservice:CustdataService) { }

  ngOnInit(): void {
    this.dataservice.currentMessage.subscribe(message => this.email = message)
    this.getitemsbycat();
    this.checkmail=localStorage.getItem("email");
  }

  getitemsbycat()
  {
    this.restService.getitemsbyCategory(this.category.catid).subscribe(
      res=>{console.log(res);
      this.items=res;},
      err=>{console.log()});
  }

  addtoCart(itemid:number)
  {
    console.log(itemid);
    console.log(this.email);
    this.restService.addtoCart(this.checkmail,itemid,1).subscribe(quant=>{
      console.log(quant);
      this.dataservice.changeTotal(quant);
      alert("item added to cart");
      this.itemViewEvent.emit();
      this.route.navigate(['customer']);
    },
    err=>{
      console.log(err);
    });
  }

}
