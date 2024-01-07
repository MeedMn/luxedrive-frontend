import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  displaySidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSidebarVisibility();
      }
    });
  }

  shouldDisplaySidebar(): boolean {
    return !['/admin/login', '/admin/register', '/admin/unauthorized'].includes(this.router.url);
  }

  private updateSidebarVisibility(): void {
    this.displaySidebar = this.shouldDisplaySidebar();
  }
}
