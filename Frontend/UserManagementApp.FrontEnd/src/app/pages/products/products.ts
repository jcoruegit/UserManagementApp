import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../models/product/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductFormComponent } from './product-form/product-form';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
  standalone: true,
  imports: [ CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule]
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'stock','acciones'];
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (res) => {
       this.dataSource.data = res;
       console.log('Productos recibidos:', res); 
      },
      error: (err) => console.error('Error de conexión:', err)
    });
  }


  abrirDialogoNuevoProducto() {
  const dialogRef = this.dialog.open(ProductFormComponent, {
    width: '720px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'created') {
      this.loadProducts();
    }
  });
}

updateProduct(producto: Product) {
  console.log('Editando producto:', producto);
  const dialogRef = this.dialog.open(ProductFormComponent, {
    width: '720px',
    data: producto
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'updated') {
      this.loadProducts();
    }
  });
}

deleteProduct(id: number): void{
    Swal.fire({
  title: 'Confirmar eliminación',
  text: '¿Estás seguro de que querés eliminar este producto?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Eliminar',
  cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(() => {
          Swal.fire('Eliminado', 'El producto fue eliminado', 'success');
          this.loadProducts();
        });
      }
    });
  }  
}

