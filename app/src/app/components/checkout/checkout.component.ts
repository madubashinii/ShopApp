import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../admin/services/auth.service';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../modules/cart-item';

@Component({
  selector: 'app-checkout',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm!: FormGroup;
  orderSubmitted = false;
  cartItems: CartItem[] = [];

  constructor(private fb: FormBuilder ,private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getLoggedUser();

    // Load cart items
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.checkoutForm = this.fb.group({
      fullName: [user.username || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      paymentMethod: ['creditCard', Validators.required],
      creditCardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });

    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(paymentMethod => {
      if (paymentMethod !== 'creditCard') {
        this.checkoutForm.get('creditCardNumber')?.clearValidators();
        this.checkoutForm.get('expiryDate')?.clearValidators();
      } else {
        this.checkoutForm.get('creditCardNumber')?.setValidators(Validators.required);
        this.checkoutForm.get('expiryDate')?.setValidators(Validators.required);
      }
      this.checkoutForm.get('creditCardNumber')?.updateValueAndValidity();
      this.checkoutForm.get('expiryDate')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      const user = this.authService.getLoggedUser();
      const orderData = {
        userId: user.id,
        fullName: this.checkoutForm.value.fullName,
        email: this.checkoutForm.value.email,
        address: this.checkoutForm.value.address,
        paymentMethod: this.checkoutForm.value.paymentMethod,
        items: this.cartService.getCartItemsValue().map(item => ({
          productId: item.id,
          productName: item.productName,
          quantity: item.quantity,
          price: item.productPrice
        }))
      };

      this.authService.submitOrder(orderData).subscribe(
        (res) => {
          console.log('Order submitted successfully:', res);
          this.orderSubmitted = true;
          this.cartService.emptyCart();
        },
        (err) => {
          console.error('Error submitting order:', err);
        }
      );
    }
  }


}
