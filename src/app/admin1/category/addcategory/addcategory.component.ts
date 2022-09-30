import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  @Input()
  category:Category;
  @Output()
  catAddedEvent = new EventEmitter();

  constructor(private router:Router,private restService :RestaurantServiceService) { }

  ngOnInit(): void {
  }

  saveCat() {
    this.restService.addCategory(this.category).subscribe(
      (book) => {
        alert("category added");
        this.catAddedEvent.emit();
        this.router.navigate(['admin', 'category']);
      }
    );
  }

}
