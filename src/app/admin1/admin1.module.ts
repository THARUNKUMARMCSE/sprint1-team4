import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Admin1RoutingModule } from './admin1-routing.module';
import { Admin1Component } from './admin1.component';
import { MenuComponent } from './menu/menu.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { AdditemComponent } from './itemlist/additem/additem.component';
import { FormsModule } from '@angular/forms';
import { Restaurant1Component } from './restaurant1/restaurant1.component';
import { ViewitemsComponent } from './restaurant1/viewitems/viewitems.component';
import { NewitemComponent } from './restaurant1/newitem/newitem.component';
import { Restaurant2Component } from './restaurant2/restaurant2.component';
import { AddrestaurantComponent } from './restaurant2/addrestaurant/addrestaurant.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { AddcustomerComponent } from './customerlist/addcustomer/addcustomer.component';
import { UpdateitemComponent } from './itemlist/updateitem/updateitem.component';
import { UpdaterestaurantComponent } from './restaurant2/updaterestaurant/updaterestaurant.component';
import { UpdatecustomerComponent } from './customerlist/updatecustomer/updatecustomer.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';


@NgModule({
  declarations: [
    Admin1Component,
    MenuComponent,
    ItemlistComponent,
    AdditemComponent,
    Restaurant1Component,
    ViewitemsComponent,
    NewitemComponent,
    Restaurant2Component,
    AddrestaurantComponent,
    CustomerlistComponent,
    AddcustomerComponent,
    UpdateitemComponent,
    UpdaterestaurantComponent,
    UpdatecustomerComponent,
    CategoryComponent,
    AddcategoryComponent
  ],
  imports: [
    CommonModule,
    Admin1RoutingModule,
    FormsModule
  ]
})
export class Admin1Module { }
