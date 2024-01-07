import { Component, OnInit } from '@angular/core';
import { RentalResponse } from '../../models/RentalResponse';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.css'
})
export class RentalsComponent implements OnInit {

  rentals: RentalResponse[] = []
  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.loadRentals()
  }
  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data;
      },
      error: (error) => {
        console.error('Error fetching rentals:', error);
      }
    });
  }
  activate(id: number): void {
    this.rentalService.changeStatus(id, "ACTIVE").subscribe({
      next: (data) => {
        this.loadRentals()
      },
      error: (error) => {
        console.error('Error fetching rental:', error);
      }
    })
  }
  cancel(id: number): void {
    this.rentalService.changeStatus(id, "CANCELED").subscribe({
      next: (data) => {
        this.loadRentals()
      },
      error: (error) => {
        console.error('Error fetching rental:', error);
      }
    })
  }
  complete(id: number): void {
    this.rentalService.changeStatus(id, "COMPLETED").subscribe({
      next: (data) => {
        this.loadRentals()
      },
      error: (error) => {
        console.error('Error fetching rental:', error);
      }
    })
  }
}
