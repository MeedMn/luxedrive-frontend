import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/LoginRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          const token = response.accessToken;
          const role = response.authority;
          this.authService.saveToken(token);
          this.authService.saveRole(role);
          this._snackBar.open('Logged in successfully', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this._snackBar.open('Wrong email or password', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000,
          });
        }
      });
    }
  }
}
