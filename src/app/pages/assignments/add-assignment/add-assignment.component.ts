import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,  Validators } from '@angular/forms';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { User } from 'src/app/shared/model/user.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatiereService } from 'src/app/shared/services/matiere.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  providers : [
    {
      provide : STEPPER_GLOBAL_OPTIONS,
      useValue : { showError : true },
    },
  ]
})
export class AddAssignmentComponent {

  auteurFormGroup = this._formBuilder.group({ auteur: [''] });
  nomFormGroup = this._formBuilder.group({ nom: ['', Validators.required] });
  matiereFormGroup = this._formBuilder.group({ matiere: ['', Validators.required] });
  dateRenduFormGroup = this._formBuilder.group({ dateRendu: ['', Validators.required]});
  user!: User ; 
  matieres:Matiere[] = [];
  auteurs : User[] = [];

  constructor(
    private assignmentsService : AssignmentsService,
    private matieresService: MatiereService,
    private router:Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('user')!);
    if(!this.isAdmin()) this.auteurFormGroup.controls.auteur.setValue(this.user._id)
    else this.auteurFormGroup = this._formBuilder.group({ auteur: ['', Validators.required] });
    this.getMatiere();
    this.getAuteurs();
  }

  isAdmin(){
    return this.user?.type === "admin";
  }
       
  getMatiere(){
    this.matieresService.getMatieres()
    .subscribe((res: any) => {
      this.matieres= res;
    });
  }

  getAuteurs(){
    this.usersService.getUsers("etudiant")
    .subscribe((res: any) => {
      this.auteurs= res;
      console.log(this.auteurs);
    });
  }

  saveAssignment() {
    if(this.nomFormGroup.invalid ||
      this.matiereFormGroup.invalid ||
      this.dateRenduFormGroup.invalid ||
      (this.isAdmin() && this.auteurFormGroup.invalid )) return ;

    const nouvelAssignment = {
      nom : this.nomFormGroup.controls.nom.value ,
      matiere : this.matiereFormGroup.controls.matiere.value,
      dateRendu : new Date(this.dateRenduFormGroup.controls.dateRendu.value),
      auteur: this.auteurFormGroup.controls.auteur.value
    }
    console.log(nouvelAssignment);

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe({
        next: (message: any) => {
        console.log(message);
        this.router.navigate(["/home"]);
      },
      error: (error: any) => {
        this._snackBar.open(error.error, "OK", {
          duration: 3000,
          panelClass: ['red-snackbar'],
         });
      }
    });
  }
}