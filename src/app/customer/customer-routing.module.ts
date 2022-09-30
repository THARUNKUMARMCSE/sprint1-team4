import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRestaurantsComponent } from './all-restaurants/all-restaurants.component';
import { AllitemsComponent } from './allitems/allitems.component';
import { CustomerComponent } from './customer.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { FoodcartComponent } from './foodcart/foodcart.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  {path:'customer/allrestaurants',component:AllRestaurantsComponent},
  {path:'customer/foodcart',component:FoodcartComponent},
  {path:'customer/allitems',component:AllitemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
