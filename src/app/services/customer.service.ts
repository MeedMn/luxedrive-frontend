import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Customer } from '../models/Customer';
import { Rental } from '../models/Rental';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers';
  constructor(private http: HttpClient, private authService: AuthService) { }
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  deleteCustomer(customerId: number): Observable<string> {
    const url = `${this.apiUrl}/${customerId}`;
    return this.http.delete<string>(url).pipe(catchError(this.handleError));
  }
  assignRental(customerEmail: any, rental: Rental): Observable<{ message: string }> {
    const url = `${this.apiUrl}/assign-rental/${customerEmail}`;
    const headers = this.getHeaders();
    return this.http.post<{ message: string }>(url, rental, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

}
