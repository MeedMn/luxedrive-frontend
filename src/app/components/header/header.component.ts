import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  open: boolean = false;
  isScrolled = false;
  bg: string = 'transparent'
  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSidebarVisibility();
      }
    });
  }
  colorHeader(): string {
    return this.router.url.startsWith('/allcars') || this.router.url.startsWith("/cardetails") ? '#222732' : 'transparent';
  }

  private updateSidebarVisibility(): void {
    this.bg = this.colorHeader();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  getFullName(): string {
    return this.authService.getUserInfos()?.fullName || '';
  }
  logout(): void {
    this.authService.removeToken();
    this.authService.removeRole();
    this.authService.removeUserInfos();
    this.router.navigate(['/']);
    this._snackBar.open('Logged out successfully', 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
