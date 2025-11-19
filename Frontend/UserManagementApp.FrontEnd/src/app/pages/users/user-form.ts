import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss'],
  imports:[CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, 
            MatCardModule, MatSelectModule, MatIconModule, ReactiveFormsModule]
})
export class UserFormComponent {
  userForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, 
                private userService: UserService,  
                private dialogRef: MatDialogRef<UserFormComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });

        //Si hay datos, significa que estamos en modo edición
    if (data) {
      this.isEditMode = true;
      this.userForm.patchValue({
        username: data.username,
        role: data.role
      });

      // En edición no queremos mostrar ni pedir contraseña
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }

  }
    onSubmit() {
    if (this.userForm.invalid) return;

    if (this.isEditMode) {
      // Llamamos a update
      this.userService.update(this.data.id, this.userForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.dialogRef.close('updated');
        },
        error: (err) => console.error(err)
      });
    } else {
      //Llamamos a create
      this.userService.create(this.userForm.value).subscribe({
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
