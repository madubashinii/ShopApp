import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      console.log("Sending user data to backend:", userData);

      this.authService.register(userData).subscribe(
        (res) => alert('Registration successful!'),
        (err) => {
          console.error("Registration error:", err);
          alert('Registration failed: ' + (err.error?.message || 'Server error'));
        }
      );
    }
  }

}
