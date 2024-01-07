import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authService: AuthService) { }

  isEmployeeRole(): boolean {
    const userRole = this.authService.getRole();
    return userRole === 'ROLE_EMPLOYEE';
  }
  Logout(): void {
    this.authService.removeToken()
    this.authService.removeRole()
    this.authService.removeUserInfos()
    window.location.reload()
  }
}
