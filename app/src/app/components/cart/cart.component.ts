import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../modules/cart-item';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.totalPrice.subscribe(price => {
      this.totalPrice = price;
    });

    this.cartService.totalQuantity.subscribe(quantity => {
      this.totalQuantity = quantity;
    });
  }
  removeItem(item: CartItem) {
    this.cartService.removeCartItem(item);
  }

  checkout() {

  }
}
