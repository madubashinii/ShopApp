import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CartItem} from '../modules/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  private productList = new BehaviorSubject<CartItem[]>(this.cartItems);

  constructor() {
  }

  addToCart(theCartItem: CartItem) {
    const existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.productList.next(this.cartItems);
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.productPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  removeCartItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.productList.next(this.cartItems);
    this.computeCartTotals();
  }

  emptyCart() {
    this.cartItems = [];
    this.productList.next(this.cartItems);
    this.computeCartTotals();
  }

  getCartItems() {
    return this.productList.asObservable();
  }
}
