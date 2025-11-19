import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../../models/product/product.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../../services/product.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
   MatCheckboxModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})
export class ProductFormComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.isEditMode = false;

    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || '', Validators.required],
      precio: [data?.precio || 0, [Validators.required, Validators.min(0), Validators.maxLength(10), Validators.pattern(/^\d{1,8}([.]\d{1,2})?$/)]],
      stock: [data?.stock || 0, [Validators.required, Validators.min(0), Validators.maxLength(8), Validators.pattern(/^[0-9]{1,8}$/)]]      
    });

   //Si hay datos, significa que estamos en modo edición
    if (data) {
      this.isEditMode = true;
      this.form.patchValue({        
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock
      });
    }
  }

  onSubmit(){
    if (this.form.invalid) return;

    if (this.isEditMode) {
      // Llamamos a update
      this.productService.update(this.data.id, this.form.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.dialogRef.close('updated');
        },
        error: (err) => console.error(err)
      });
    } else {
      //Llamamos a create
      this.productService.create(this.form.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.dialogRef.close('created');
        },
        error: (err) => console.error(err)
      });
    }
  }    

  onCancel() {
    this.dialogRef.close();
  }
}

