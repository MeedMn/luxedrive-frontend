import { Component, Input } from '@angular/core';
import { Car } from '../../models/Car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(private router: Router) { }

  @Input() car: Car | undefined;
  @Input() size: string = ''

  navigateToCardDetails(cardId: any): void {
    this.router.navigate(['/cardetails', cardId]);
  }
}
