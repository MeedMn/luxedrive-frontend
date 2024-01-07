import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  constructor(private customerService: CustomerService) { }


  customers: Customer[] = [];

  ngOnInit(): void {
    this.loadCustomers()
  }
  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  deleteCustomer(id: number): void {
    if (id && confirm("Are you sure ?")) {
      this.customerService.deleteCustomer(id).subscribe({
        next: (data) => {
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
        }
      });
    }
  }
}
