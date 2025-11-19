import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { UserDto } from '../../models/user/user-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserFormComponent } from './user-form';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            MatTableModule, 
            MatButtonModule, 
            MatCardModule, 
            MatIconModule, 
            MatDialogModule,
            MatPaginatorModule,
            MatSortModule],
  templateUrl: './users.html',
  styleUrl:'./users.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'role', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  loading = true;
  errorMessage = '';
  user!: UserDto;
  usuarioLogueado! :string | null ;
  

  constructor(private userService: UserService, 
                private router: Router, 
                private dialog: MatDialog,
                private authService : AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.usuarioLogueado = this.authService.getUsername();
  }

   @ViewChild(MatPaginator) paginator!: MatPaginator; // referencia al paginador
   @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit() {
    // esto conecta el paginador con la tabla
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    loadUsers() {
    this.userService.getAll().subscribe({
      next: (res) => {        
        this.dataSource.data = res;
        console.log('Usuarios recibidos:', res); 
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        console.log('Error al cargar usuarios ' + err);
        this.errorMessage = '⚠️ Error al cargar los usuarios.';
        this.loading = false;
      }
    });
  }

    abrirDialogoNuevoUsuario() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'created') {
        this.loadUsers(); // recargar grilla
      }
    });
  }
  
  editUser(user: any) {
  const dialogRef = this.dialog.open(UserFormComponent, {
    width: '400px',
    data: user // pasamos el usuario seleccionado
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'updated') {
      this.loadUsers(); // recarga la grilla
    }
  });
}

deleteUser(id: number) {

  // Primero obtenemos el usuario del backend
  this.userService.getById(id).subscribe({
    next: (response) => {
      this.user = response;

      // Validación: No permitir eliminarse a sí mismo
      if (this.user.username === this.usuarioLogueado) {
        Swal.fire({
          icon: 'error',
          title: 'Operación no permitida',
          text: 'No podés eliminar tu propio usuario',
          confirmButtonText: 'Aceptar'
        });
        return; // Cortar ejecución
      }

      // Si no es el mismo usuario, preguntar confirmación
      Swal.fire({
        title: 'Confirmar eliminación',
        text: '¿Estás seguro de que querés eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.userService.delete(id).subscribe({
            next: (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado',
                text: 'El usuario fue eliminado correctamente'
              });
              this.loadUsers();
            },
            error: (err) => console.error(err)
          });
        }
      });
    },
    error: (err) => console.error(err)
  });

}
}



