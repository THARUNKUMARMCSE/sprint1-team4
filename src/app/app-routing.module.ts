import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  {path:'',component:HeroComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HeroComponent},
  {path:'about',component:AboutComponent},
  
  { 
    path: 'customer', 
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) 
  },
  { path: 'admin', 
  loadChildren: () => import('./admin1/admin1.module').then(m => m.Admin1Module) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
