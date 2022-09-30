import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustdataService {
  private custemail = new BehaviorSubject<string>("defaultmessage");
  currentMessage = this.custemail.asObservable();

  private subtotal=new BehaviorSubject<any>(null);
  total=this.subtotal.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.custemail.next(message);
  }

  changeTotal(message:any){
    this.subtotal.next(message);
  }
}


