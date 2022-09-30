import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItems } from '../model/cart-items';
import { Category } from '../model/category';
import { Customer } from '../model/customer';
import { Item } from '../model/item';
import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  private usersUrl: string='';
  constructor(private http:HttpClient) { 
    this.usersUrl = 'http://localhost:8080/api/restaurants';
  }

  public findAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.usersUrl);
  }
  /*getAllRestaurants() {
    return this.httpClient.get<Restaurant[]>('http://localhost:8080/api/restaurants');
  }*/

  public findItemsByRestaurant(id:any)
  {
    return this.http.get<Item[]>('http://localhost:8080/api/restaurants/'+id+'/items');
  }

  public addtoCart(email:string,itemid:number,quantity:number)
  {
    return this.http.post('http://localhost:8080/cart/'+email+'/'+itemid+'/'+quantity,null);
  }

  public showCart(email:string)
  {
    return this.http.get<CartItems[]>('http://localhost:8080/cart/'+email);
  }

  public deleteItemfromCart(email:string,itemid:number):Observable<any>
  {
    return this.http.delete<CartItems>('http://localhost:8080/cart/delete/' + email + '/' + itemid);
  }

  public clearcart(email:string)
  {
    return this.http.delete<CartItems>('http://localhost:8080/cart/clear/'+email);
  }

  public getAllItems():Observable<Item[]>{
    return this.http.get<Item[]>('http://localhost:8080/api/items');
  }

  public addItem(newItem:Item)
  {
    return this.http.post<Item>('http://localhost:8080/api/items', newItem);
  }

  public deleteItemFromRestaurant(restid:number,itemid:number)
  {
    return this.http.delete<Item>('http://localhost:8080/api/restaurants/'+restid+'/'+'items/'+itemid);
  }

  public addItemtoRestaurant(restid:number,newItem:Item)
  {
    return this.http.post<Item>('http://localhost:8080/api/restaurants/'+restid+'/items',newItem);
  }

  public deleteRestaurant(restid:number)
  {
    return this.http.delete<Restaurant>('http://localhost:8080/api/restaurants/'+restid);
  }

  public addRestaurant(rest:Restaurant):Observable<Restaurant>
  {
    return this.http.post<Restaurant>('http://localhost:8080/api/restaurants',rest);
  }

  public getCustomers():Observable<Customer[]>
  {
    return this.http.get<Customer[]>('http://localhost:8080/customer/allcustomers');
  }

  public deleteCustomer(custid:number)
  {
    return this.http.delete<Customer>('http://localhost:8080/customer/delete/'+custid);
  }

  public addCustomer(newcust:Customer):Observable<Customer>
  {
    return this.http.post<Customer>('http://localhost:8080/customer/add',newcust);
  }

  public updateItem(itemid:number,newitem:Item)
  {
    return this.http.put<Item>('http://localhost:8080/api/items/'+itemid,newitem);
  }

  public updateRestaurant(restid:number,newrest:Restaurant)
  {
    return this.http.put<Restaurant>('http://localhost:8080/api/restaurants/'+restid,newrest);
  }

  public updateCustomer(custid:number,newcust:Customer)
  {
    return this.http.put<Customer>('http://localhost:8080/customer/customerupdate/'+custid,newcust);
  }

  public getAllCategories():Observable<Category[]>
  {
    return this.http.get<Category[]>('http://localhost:8080/category/allcategories');
  }

  public deleteCategory(id:number)
  {
    return this.http.delete<Category>('http://localhost:8080/category/delete/'+id);
  }

  public addCategory(newcat:Category)
  {
    return this.http.post<Category>('http://localhost:8080/category/add',newcat);
  }

  public getitemsbyCategory(catid:number)
  {
    return this.http.get<Item[]>('http://localhost:8080/api/itemsbycat/'+catid);
  }

  public getRestaurantsByItemid(itemid:number)
  {
    return this.http.get<Restaurant[]>('http://localhost:8080/api/items/'+itemid+'/restaurants');
  }

  public updatequantity(email:string,id:number,quant:number)
  {
    return this.http.post<any>('http://localhost:8080/cart/update/'+email+'/'+id+'/'+quant,null);
  }

}
