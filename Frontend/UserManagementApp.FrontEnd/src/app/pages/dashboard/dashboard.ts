import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../services/users.service';
import { ProductService } from '../../services/product.service';
import { ProductTopStockChartComponent } from '../../charts/product-top-stock-chart/product-top-stock-chart';
import {UsersRoleChartComponent} from '../../charts/users-role-chart/users-role-chart';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    ProductTopStockChartComponent,
    UsersRoleChartComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  username: string | null = '';
  isMobile = false;
  adminCount = 0;
  userCount = 0;
  products: any[] = [];
  users: any[] = [];
  isAdmin = false;

  constructor(private observer: BreakpointObserver, 
              private userService: UserService, 
              private productService: ProductService,
              private authService: AuthService) {
    this.username = localStorage.getItem('username');
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
  this.userService.getAll().subscribe(res => {
    this.users = res;
  });

  this.productService.getAll().subscribe(res => {
    this.products = res
  });
}

  ngAfterViewInit() {
    this.observer.observe([Breakpoints.Handset]).subscribe((res) => {
      this.isMobile = res.matches;
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}


