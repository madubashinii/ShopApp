import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../admin/services/auth.service';

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

  constructor(private fb: FormBuilder , private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getLoggedUser();

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
    if (this.checkoutForm.valid) {
      const user = this.authService.getLoggedUser(); // or from localStorage
      const orderData = {
        ...this.checkoutForm.value,
        userId: user.id // include user ID if needed for backend
      };

      // Send to backend here
      console.log('Sending Order:', orderData);
      this.orderSubmitted = true;
    }
  }

}
