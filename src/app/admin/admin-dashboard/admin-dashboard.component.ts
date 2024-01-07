import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { BarController, BarElement, CategoryScale, Chart, LineController, LineElement, LinearScale, PointElement } from 'chart.js';
import { RentalService } from '../../services/rental.service';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { Customer } from '../../models/Customer';
import { RentalResponse } from '../../models/RentalResponse';
import { Employee } from '../../models/Employee';
Chart.register(BarController, CategoryScale, LinearScale, BarElement, LineController, PointElement, LineElement)
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  public chart: any;
  customersCount: number = 0
  rentalsCount: number = 0
  employeesCout: number = 0
  totalMoney: number = 0
  constructor(private rentalService: RentalService, private customerService: CustomerService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['500', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'darkorange'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
    this.loadCustomers()
    this.loadEmployees()
    this.loadRentals()
  }
  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customersCount = data.length;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employeesCout = data.length;
      },
      error: (error) => {
        console.error('Error fetching Employees:', error);
      }
    });
  }
  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentalsCount = data.length;
        this.totalMoney = data.reduce((sum: number, rental: RentalResponse) => {
          return sum + (rental.totalCost || 0);
        }, 0);
      },
      error: (error) => {
        console.error('Error fetching rentals:', error);
      }
    });
  }
}
