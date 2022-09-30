import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { RestaurantServiceService } from 'src/app/service/restaurant-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category:Array<Category>;
  action: string;
  selectedCat: Category|any;


  constructor(private restService:RestaurantServiceService,private activedRoute: ActivatedRoute,private router:Router) { }

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
            return book.catid=== +id;
          });
        }
      }
    );

  }

  deleteCategory(catid:number)
  {
    this.restService.deleteCategory(catid).subscribe(res=>{
      console.log(res);
      this.getAllCategories();
      alert("category deleted");
    },err=>{console.log(err)});
  }

  addCategory() {
    this.selectedCat = new Category();
    this.router.navigate(['admin', 'category'], { queryParams: { action: 'add' } });
  }

}
