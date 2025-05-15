import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      // Call backend authentication service
      this.authService.login(credentials).subscribe(
        (res: any) => {
          if (res.success) {
            alert('Login successful!');
            if (res.role === 'ADMIN') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            alert('Login failed: Invalid credentials');
          }
        },
        (err) => {
          alert('Login failed: ' + (err.error?.message || 'Server error'));
        }
      );
    }
  }

}
