import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  username: string | null = null;  

  ngOnInit() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Algunos tokens usan "unique_name" o "sub" para el usuario
      this.username =
        payload['unique_name'] ||
        payload['sub'] ||
        payload['name'] ||
        payload['username'] ||
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
        'Usuario';
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      this.username = 'Usuario';
    }
  }
}

logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
}
