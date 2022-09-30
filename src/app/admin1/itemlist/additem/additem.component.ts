import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  @Input()
  item:Item;
  @Output()
  itemAddedEvent = new EventEmitter();

  constructor(private router:Router,private restService :RestaurantServiceService) { }

  ngOnInit(): void {
  }

  saveItem() {
    this.restService.addItem(this.item).subscribe(
      (item) => {
        this.itemAddedEvent.emit();
        this.router.navigate(['admin', 'itemlist']);
      }
    );
  }

}
