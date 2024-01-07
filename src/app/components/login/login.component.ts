import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginRequest } from '../../models/LoginRequest';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Customer } from '../../models/Customer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
          const infos: Customer = response.userInfos;
          this.authService.saveToken(token);
          this.authService.saveRole(role);
          this.authService.saveUserInfos(infos)
          this._snackBar.open('Logged in successfully', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.router.navigate(['/']);
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
