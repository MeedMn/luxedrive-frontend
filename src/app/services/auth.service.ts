import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SignupRequest } from '../models/SignupRequest';
import { LoginRequest } from '../models/LoginRequest';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signin`, loginRequest).pipe(catchError(this.handleError));
  }
  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signup`, signupRequest).pipe(catchError(this.handleError));
  }
  saveUserInfos(userInfos: Customer): void {
    localStorage.setItem('infos', JSON.stringify(userInfos));
  }
  getUserInfos(): Customer | undefined {
    return JSON.parse(localStorage.getItem('infos') || '');
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  removeToken(): void {
    localStorage.removeItem('token');
  }
  removeRole(): void {
    localStorage.removeItem('role');
  }
  removeUserInfos(): void {
    localStorage.removeItem('infos');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
