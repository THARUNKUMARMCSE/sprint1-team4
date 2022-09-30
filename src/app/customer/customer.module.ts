import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { AllRestaurantsComponent } from './all-restaurants/all-restaurants.component';
import { CustomerComponent } from './customer.component';
import { ViewItemsComponent } from './all-restaurants/view-items/view-items.component';
import { FoodcartComponent } from './foodcart/foodcart.component';
import { ItemsbycatComponent } from './itemsbycat/itemsbycat.component';
import { AllitemsComponent } from './allitems/allitems.component';
import { RestComponent } from './allitems/rest/rest.component';
import { UpdatequantComponent } from './foodcart/updatequant/updatequant.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerdashboardComponent,
    AllRestaurantsComponent,
    CustomerComponent,
    ViewItemsComponent,
    FoodcartComponent,
    ItemsbycatComponent,
    AllitemsComponent,
    RestComponent,
    UpdatequantComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomerRoutingModule,
    FormsModule
  ]
})
export class CustomerModule { }
