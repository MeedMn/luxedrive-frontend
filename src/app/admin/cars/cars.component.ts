import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/Car';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AddCarComponent } from '../dialogs/add-car/add-car.component';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  cars: Car[] = []
  constructor(public dialog: MatDialog, private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars()
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
  createCar(newCar: Car): void {
    this.carService.createCar(newCar).subscribe({
      next: (data) => {
        this.loadCars();
      },
      error: (error) => {
        console.error('Error creating car:', error);
      }
    });
  }
  deleteCar(id: number): void {
    if (id && confirm("Are you sure ?")) {
      this.carService.deleteCar(id).subscribe({
        next: (data) => {
          this.loadCars();
        },
        error: (error) => {
          console.error('Error deleting car:', error);
        }
      });
    }
  }
  updateCar(carId: number, carRequest: Car): void {
    if (carId) {
      this.carService.updateCar(carId, carRequest).subscribe({
        next: (data) => {
          this.loadCars();
        },
        error: (error) => {
          console.error('Error updating cars:', error);
        }
      });
    }
  }

  openAddCarDialog(): void {
    const dialogRef = this.dialog.open(AddCarComponent, {
      width: '500px',
      data: { car: {} as Car },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createCar(result);
      }
    });
  }
  openUpdateCarDialog(carId: number): void {
    let car1 = this.cars.find(car => car.id === carId);
    const dialogRef = this.dialog.open(AddCarComponent, {
      width: '500px',
      data: { car: { title: car1?.title, description: car1?.description, image: car1?.image, fuel: car1?.fuel, make: car1?.make, model: car1?.model, registrationNumber: car1?.registrationNumber, price: car1?.price, year: car1?.year, status: car1?.status } as Car },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCar(carId, result);
      }
    });
  }
}
