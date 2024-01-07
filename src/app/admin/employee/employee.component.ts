import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatCardModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) { }
  employees: Employee[] = [];

  ngOnInit(): void {
    this.loadEmployees()
  }
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error fetching Employees:', error);
      }
    });
  }
  deleteEmployee(id: number): void {
    if (id && confirm("Are you sure ?")) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (data) => {
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
  }
}
