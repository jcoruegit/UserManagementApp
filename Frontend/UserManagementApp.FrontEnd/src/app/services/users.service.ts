import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user/user-dto.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/response/api-response';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/GetAll`);
  }

  getById(id: number): Observable<UserDto>{
    return this.http.get<UserDto>(`${this.apiUrl}/GetById/${id}`);
  }

  create(user: UserDto): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/Create`, user);
  }

  update(id: number, user: UserDto): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/Update/${id}`, user);
  }

  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/Delete/${id}`);
  }
}
