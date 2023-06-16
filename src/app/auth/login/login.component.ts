import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void { 
    if (this.formGroup.valid) { 
      const userLogin = this.formGroup?.value;
      this.authService
          .signin(userLogin)
          .pipe(first())
          .subscribe({
            next: (res: any) => {
              if(res.auth) {
                localStorage.setItem('token', res.token );
                localStorage.setItem('user', JSON.stringify(res.user));
              }
              console.log(res);
            },
            error: (error: any) => {
              console.log("error");
            },
          });
    }else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
