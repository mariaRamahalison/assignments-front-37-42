import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MatiereComponent } from 'src/app/shared/components/matiere/matiere.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FileService } from 'src/app/shared/services/file.service';
import { MatiereService } from 'src/app/shared/services/matiere.service';
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
  userConnected: any;
  matiere: any;
  uri_api = environment.api_url;
  constructor( private fileService: FileService, 
    private fb: FormBuilder,
    private authService: AuthService,
    private matiereService: MatiereService,
    private _snackBar: MatSnackBar,
    private router: Router,
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
      this.setDefaultValue();
      if(this.isProf(this.userConnected)){
        this.matiere = await lastValueFrom(this.matiereService.getMatiereProf(this.userConnected._id));
      }
    }
  }

  setDefaultValue(){
    this.formGroup.get('nom').setValue(this.userConnected.nom);
    this.formGroup.get('prenom').setValue(this.userConnected.prenom);
    this.formGroup.get('email').setValue(this.userConnected.email);
    this.getPhoto();
  }

  isProf(user){
    return user.type === "prof"
  }

  getPhoto(){
    if(this.userConnected.photo !== ""){
      this.imageURL = `${this.uri_api}/photo/${this.userConnected.photo}`
    }else{
      this.imageURL = '../assets/img/avatars/1.png';
    }
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
    });;
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

  reset(){    
    this.pdp = null;
    this.getPhoto();
  }

  changeMatiere(){
    const dialogRef = this.dialog.open(MatiereComponent, {
      disableClose:true, data: {update:true, data: this.matiere, prof: this.userConnected._id}
     });
     dialogRef.afterClosed().subscribe(result => {
      this.matiere = result;
    });
  }

}
