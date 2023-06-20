import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MatiereComponent } from 'src/app/shared/components/matiere/matiere.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EventBusService } from 'src/app/shared/services/event.bus.service';
import { FileService } from 'src/app/shared/services/file.service';
import { MatiereService } from 'src/app/shared/services/matiere.service';
import { getPhotoUtil } from 'src/app/shared/utils/diplayImage';
import { environment } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  formGroup!: FormGroup;
  pdp: any;
  imageURL: string;
  matiereImage: String;
  userConnected: any;
  matiere: any;
  uri_api = environment.api_url;
  constructor( private fileService: FileService, 
    private fb: FormBuilder,
    private authService: AuthService,
    private matiereService: MatiereService,
    private _snackBar: MatSnackBar,
    private eventBusService: EventBusService,
    public dialog: MatDialog){

  }

  async ngOnInit() {
    this.formGroup = this.fb.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
    const user = localStorage.getItem('user');
    if(user) {
      this.userConnected = JSON.parse(user);
      await this.setDefaultValue();
      if(this.isProf(this.userConnected)){
        this.matiere = await lastValueFrom(this.matiereService.getMatiereProf(this.userConnected._id));
        await this.getMatierePhoto();
      }
    }
  }

  async setDefaultValue(){
    this.formGroup.get('nom').setValue(this.userConnected.nom);
    this.formGroup.get('prenom').setValue(this.userConnected.prenom);
    this.formGroup.get('email').setValue(this.userConnected.email);
    await this.getPhoto();
  }

  isProf(user){
    return user.type === "prof"
  }

  async getPhoto(){
    this.imageURL = await getPhotoUtil(this.userConnected.photo);
  }

  async onSubmit(){
    if(this.formGroup.valid){
      const userIn = this.formGroup?.value;
      let photo = '';
    if(this.pdp){
      const fileupload = await lastValueFrom(this.fileService.uploadFile(this.pdp)).catch((error: any)=>{
        this._snackBar.open(error.error, "OK", {
        duration: 3000,
        panelClass: ['red-snackbar'],
      });
    });
      photo = fileupload.message.name;
      userIn.photo = photo;
    }
    await lastValueFrom(this.authService.update(this.userConnected._id, userIn)).then((res: any)=>{
      if(res) {       
        localStorage.setItem('user', JSON.stringify(res));
        this._snackBar.open("Profil modifié", "OK", {
          duration: 3000,
          panelClass: ['red-snackbar'],
        });
        this.eventBusService.emitEvent(res);
      }
    
    }).catch((error: any)=>{
        this._snackBar.open(error.error, "OK", {
        duration: 3000,
        panelClass: ['red-snackbar'],
      });
    });
  }
}

  onFileSelected(event: Event): void {
    const file = (event.target as any)?.files[0];
    if(file){
      this.pdp=file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  async reset(){    
    this.pdp = null;
    await this.getPhoto();
  }

 async changeMatiere(){
    const dialogRef = this.dialog.open(MatiereComponent, {
      disableClose:true, data: {update:true, data: this.matiere, prof: this.userConnected._id}
     });
     await dialogRef.afterClosed().subscribe(async (result) => {
      this.matiere = result;
      await this.getMatierePhoto();
    });
  }

  async getMatierePhoto(){
    this.matiereImage = await getPhotoUtil(this.matiere.photo);
  }
}
