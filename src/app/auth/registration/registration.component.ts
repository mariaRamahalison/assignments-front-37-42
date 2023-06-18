import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FileService } from 'src/app/shared/services/file.service';
import { first, last, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatiereComponent } from 'src/app/shared/components/matiere/matiere.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formGroup!: FormGroup;
  pdp: any;
  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private fileService: FileService, 
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }
  onFileSelected(event: Event): void {
    const file = (event.target as any)?.files[0];
    if(file){
      this.pdp=file;
    }
  }

  async submitForm(){
    if(this.formGroup.valid){
      let photo = '';
    if(this.pdp){
      const fileupload = await lastValueFrom(this.fileService.uploadFile(this.pdp)).catch((error: any)=>{
        this._snackBar.open(error.error, "OK", {
        duration: 3000,
        panelClass: ['red-snackbar'],
      });
    });;
      photo = fileupload.message.name;
    }
    const userIn = this.formGroup?.value;
    userIn.photo = photo;

    await lastValueFrom(this.authService.signup(userIn)).then((res: any)=>{
      if(res.auth) {
        localStorage.setItem('token', res.token );
        localStorage.setItem('user', JSON.stringify(res.user));
      }
      if(res.user.type === "prof"){
        const dialogRef = this.dialog.open(MatiereComponent, {
          disableClose:true,data: res.user._id
         });
      } else {
        this.router.navigate(['/']);
      } 
    }).catch((error: any)=>{
        this._snackBar.open(error.error, "OK", {
        duration: 3000,
        panelClass: ['red-snackbar'],
      });
    });
    ;
    }else{
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
