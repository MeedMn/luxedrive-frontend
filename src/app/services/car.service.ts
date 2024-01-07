import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Car } from '../models/Car';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';
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
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(catchError(this.handleError));
  }
  getCarById(carId: number): Observable<Car> {
    const url = `${this.apiUrl}/${carId}`;
    return this.http.get<Car>(url).pipe(catchError(this.handleError));
  }
  createCar(carRequest: Car): Observable<Car> {
    const headers = this.getHeaders();
    return this.http.post<Car>(this.apiUrl, carRequest, { headers }).pipe(catchError(this.handleError));
  }
  deleteCar(carId: number): Observable<string> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${carId}`;
    return this.http.delete<string>(url, { headers }).pipe(catchError(this.handleError));
  }
  updateCar(carId: number, carRequest: Car): Observable<Car> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${carId}`;
    return this.http.put<Car>(url, carRequest, { headers }).pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

}
