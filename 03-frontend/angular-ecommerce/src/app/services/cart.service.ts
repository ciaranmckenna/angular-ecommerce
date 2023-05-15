import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // array of cart-item objects
  cartItems: CartItem[] = [];

  // subject used to publish events 
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){

    // Check if we already have the item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length>0){

      // find the item in the cart based on the item id
      // find returns the first elemet that passes else returns undefined and checks each element in the array
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id );
      
      // check if we found it
      // alreadyExistsInCart will have a value of true or false depending if we found it or not
      alreadyExistsInCart = (existingCartItem != undefined); 

    }

    if(alreadyExistsInCart){
      // increment the quantity
      existingCartItem.quantity ++; 
    }
    else{
      // just add the item to the array
      this.cartItems.push(theCartItem); 
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receieve the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    // log cart data for debugging
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number){
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.quantity;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity},
                        unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`)
    }
    // log the total price to 2 dp and log total quantity
    console.log(`totalPrice ${totalPriceValue.toFixed(2)}, totalQuantity ${totalQuantityValue}`);
    console.log('----')
  }
}
