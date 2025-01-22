import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      this.orderSubmitted = true;
    }
  }
}
