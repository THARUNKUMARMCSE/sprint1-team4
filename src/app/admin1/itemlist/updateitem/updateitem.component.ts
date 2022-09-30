import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-updateitem',
  templateUrl: './updateitem.component.html',
  styleUrls: ['./updateitem.component.css']
})
export class UpdateitemComponent implements OnInit {

  @Input()
  item:Item;
  @Output()
  itemUpdatedEvent = new EventEmitter();

  constructor(private router:Router,private restService :RestaurantServiceService) { }

  ngOnInit(): void {
  }

  updateItem()
  {
    this.restService.updateItem(this.item.itemid,this.item).subscribe(
      (item) => {
        alert("item updated");
        this.itemUpdatedEvent.emit();
        this.router.navigate(['admin', 'itemlist']);
      }
    );
  }

}
