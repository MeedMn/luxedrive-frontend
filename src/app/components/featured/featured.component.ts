import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/Car';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent implements OnInit {
  constructor(private carService: CarService) { }
  cars: Car[] = [];
  ngOnInit(): void {
    this.loadCars();
  }
  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (error) => {
        console.error('Error fetching Cars:', error);
      }
    });
  }

}
