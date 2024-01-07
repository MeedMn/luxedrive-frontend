import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../../models/SignupRequest';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userRequest: SignupRequest = {
        fullName: this.registerForm.get('fullName')?.value,
        authority: 'CUSTOMER',
        email: this.registerForm.get('email')?.value,
        phoneNumber: this.registerForm.get('phone')?.value,
        address: this.registerForm.get('address')?.value,
        password: this.registerForm.get('password')?.value
      };

      this.authService.signup(userRequest).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
