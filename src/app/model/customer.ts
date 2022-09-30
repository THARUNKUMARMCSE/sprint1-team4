import { Address } from "./address";

export class Customer {
    customerid:number=0;
    email:string='';
    password:string='';
    firstname:string='';
    lastname:string='';
    phoneno:string='';
    address: Address = new Address;
    token:string='';

}
