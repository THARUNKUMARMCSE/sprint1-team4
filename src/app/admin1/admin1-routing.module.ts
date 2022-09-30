import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin1Component } from './admin1.component';
import { CategoryComponent } from './category/category.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { Restaurant1Component } from './restaurant1/restaurant1.component';
import { Restaurant2Component } from './restaurant2/restaurant2.component';

const routes: Routes = [{ path: '', component: Admin1Component },
{path:'itemlist',component:ItemlistComponent},
{path:'restaurant1',component:Restaurant1Component},
{path:'restaurant2',component:Restaurant2Component},
{path:'customerlist',component:CustomerlistComponent},
{path:'category',component:CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Admin1RoutingModule { }
