import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginReq } from '../models/auth/login-request.model';
import { LoginResp } from '../models/auth/login-response.model';
import { RegisterReq } from '../models/auth/register-request.model';
import { RegisterResp } from '../models/auth/register-response.model';
import {jwtDecode} from 'jwt-decode';
import { ApiResponse } from '../models/response/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginReq): Observable<ApiResponse<string>> {
    return this.http.post<LoginResp>(`${this.apiUrl}/login`, credentials);
  }

  register(payload: RegisterReq): Observable<ApiResponse<string>> {
    return this.http.post<RegisterResp>(`${this.apiUrl}/register`, payload);
  }

 getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      // Compatibilidad con los claims de Microsoft
      const role =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        decoded.role;
      return role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      const name =
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
        decoded.unique_name;
      return name || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isUser(): boolean {
    return this.getUserRole() === 'User';
  }

  getToken(): string | null {
  return localStorage.getItem('token');
}

}

