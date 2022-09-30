import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { Restaurant } from 'src/app/model/restaurant';
import { CustdataService } from 'src/app/service/custdata.service';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {

  @Input()
  item:Item;
  @Output()
  restviewEvent=new EventEmitter();

  restaurant:Array<Restaurant>;
  email:string;
  checkmail:any;

  constructor(private restservice:RestaurantServiceService,private route:Router,private dataservice:CustdataService) { }

  ngOnInit(): void {
    this.checkmail=localStorage.getItem("email");
    this.dataservice.currentMessage.subscribe(message => this.email = message);
    this.getRest();
  }

  getRest()
  {
    //this.restviewEvent.emit();
    this.restservice.getRestaurantsByItemid(this.item.itemid).subscribe(
      res=>{console.log(res);
      this.restaurant=res},
      err=>{console.log(err)});
  }

  addtoCart(itemid:number)
  {
    console.log(itemid);
    console.log(this.email);
    this.restservice.addtoCart(this.checkmail,itemid,1).subscribe(quant=>{
      console.log(quant);
      this.dataservice.changeTotal(quant);
      alert("item added to cart");
      //this.itemViewEvent.emit();
      this.route.navigate(['customer','allitems']);
    },
    err=>{
      console.log(err);
    });
  }

}
