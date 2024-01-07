import { Component, Input } from '@angular/core';
import { Car } from '../../models/Car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-row-card',
  standalone: true,
  imports: [],
  templateUrl: './row-card.component.html',
  styleUrl: './row-card.component.css'
})
export class RowCardComponent {
  constructor(private router: Router) { }
  @Input() car: Car | undefined;
  navigateToCardDetails(cardId: any): void {
    this.router.navigate(['/cardetails', cardId]);
  }
}
