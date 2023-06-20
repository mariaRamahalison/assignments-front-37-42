import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';
import { MatiereService } from '../../services/matiere.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit{
  formGroup!: FormGroup;
  photo: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<any>,
  private fb: FormBuilder, 
  private _snackBar: MatSnackBar,
  private router: Router,
  private matiereService:MatiereService,
  private fileService: FileService){

  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nom: [null, [Validators.required]],
    });
  }

  async submitForm(){
    if(this.formGroup.valid){
      if(!this.data.update) {
        this.ajoutMatiere();
      }else{

      }
    }else{
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  onFileSelected(event: Event){
    const file = (event.target as any)?.files[0];
    if(file){
      this.photo=file;
    }
  }
  
  reset(){
    this.photo = null;
  }

  async ajoutMatiere(){
    let illu = '';
      if(this.photo){
        if(this.photo){
          const fileupload = await lastValueFrom(this.fileService.uploadFile(this.photo)).catch((error: any)=>{
            this._snackBar.open(error.error, "OK", {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        });
          illu = fileupload.message.name;
        }
      }
      const matiere = this.formGroup?.value;
      matiere.photo = illu;
      matiere.idProf = this.data.data;
      
      await lastValueFrom(this.matiereService.saveMatiere(matiere)).then(()=>{
        this.router.navigate(['/']);
      }).catch((error: any)=>{

        this._snackBar.open(error.error, "OK", {
          duration: 3000,
          panelClass: ['red-snackbar'],
        });
      }).finally(()=>{this.closeDialog()});
    }

    async updateMatiere(){
      let illu = '';
      if(this.photo){
        if(this.photo){
          const fileupload = await lastValueFrom(this.fileService.uploadFile(this.photo)).catch((error: any)=>{
            this._snackBar.open(error.error, "OK", {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        });
          illu = fileupload.message.name;
        }
      }
      const matiere = this.formGroup?.value;
      matiere.photo = illu;
      matiere.idProf = this.data.data;
      
      await lastValueFrom(this.matiereService.saveMatiere(matiere)).then(()=>{
        this.router.navigate(['/']);
      }).catch((error: any)=>{

        this._snackBar.open(error.error, "OK", {
          duration: 3000,
          panelClass: ['red-snackbar'],
        });
      }).finally(()=>{this.closeDialog()});
    }
}
