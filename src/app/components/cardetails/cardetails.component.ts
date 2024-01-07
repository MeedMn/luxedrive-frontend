import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/Car';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../services/customer.service';
import { Rental } from '../../models/Rental';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cardetails',
  standalone: true,
  imports: [CardComponent, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './cardetails.component.html',
  styleUrl: './cardetails.component.css'
})
export class CardetailsComponent implements OnInit {
  rentForm: FormGroup;
  constructor(private carService: CarService, private route: ActivatedRoute, private fb: FormBuilder, private customerService: CustomerService, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.rentForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  cars: Car[] = [];
  selectedCar: Car | undefined;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.carService.getCarById(params['id']).subscribe((data) => {
        this.selectedCar = data;
      });
    });
    this.loadCars();
  }
  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        this.cars = this.shuffleArray(data);
        this.cars = this.cars.slice(0, 4);
      },
      error: (error) => {
        console.error('Error fetching Cars:', error);
      }
    });
  }
  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  onSubmit(): void {
    if (this.rentForm.valid) {
      const rentalRequest: Rental = {
        startDate: this.rentForm.value.startDate,
        endDate: this.rentForm.value.endDate,
        status: "PENDING",
        car: this.selectedCar?.id,
        customer: this.authService.getUserInfos()?.id
      };
      const customerEmail: string | undefined = this.authService.getUserInfos()?.email;

      this.customerService.assignRental(customerEmail, rentalRequest).subscribe({
        next: (response) => {
          this._snackBar.open('Wait A call from the owner', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000,
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
          this._snackBar.open('You arent allowed to rent this car', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 3000,
          });
        }
      });

    } else {
      this.rentForm.markAllAsTouched();
    }
  }


}
