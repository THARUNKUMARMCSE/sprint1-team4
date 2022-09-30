import { Restaurant } from "./restaurant";
import { Category } from "./category";
export class Item {
    itemid: number;
    itemname:string='';
    category: Category = new Category;
    cost:any;
    restlist:Array<Restaurant>=[]

}
