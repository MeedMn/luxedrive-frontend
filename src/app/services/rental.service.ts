import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError } from 'rxjs';
import { RentalResponse } from '../models/RentalResponse';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:8080/api/rentals';
  constructor(private http: HttpClient, private authService: AuthService) { }
  getAllRentals(): Observable<RentalResponse[]> {
    return this.http.get<RentalResponse[]>(this.apiUrl).pipe(catchError(this.handleError));
  }
  changeStatus(RentalId: any, status: string): Observable<{ message: string }> {
    const url = `${this.apiUrl}/${RentalId}/${status}`;
    return this.http.post<{ message: string }>(url, '').pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
