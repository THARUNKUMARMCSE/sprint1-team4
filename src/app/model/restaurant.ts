import { Address } from "./address";
import { Item } from "./item";

export class Restaurant {
    restaurantId:number=0;
    restaurantName:string='';
    address:Address=new Address;
    managerName:string='';
    contactNumber:string='';
    itemlist: Array<Item> = [];
}
