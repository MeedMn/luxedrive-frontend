import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../../models/SignupRequest';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
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
        authority: 'EMPLOYEE',
        email: this.registerForm.get('email')?.value,
        phoneNumber: this.registerForm.get('phone')?.value,
        address: this.registerForm.get('address')?.value,
        password: this.registerForm.get('password')?.value
      };

      this.authService.signup(userRequest).subscribe(
        (response) => {
          this.router.navigate(['/admin/login']);
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
