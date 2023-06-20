import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormBuilder, Validators } from '@angular/forms';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/model/user.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatiereService } from 'src/app/shared/services/matiere.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
 providers : [
  {
    provide : STEPPER_GLOBAL_OPTIONS,
     useValue : { showError : true },
  },
]
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment ;
 // associées aux champs du formulaire

 nomFormGroup = this._formBuilder.group({nom: ['', Validators.required]});
 matiereFormGroup = this._formBuilder.group({matiere: ['', Validators.required]});
 dateRenduFormGroup = this._formBuilder.group({dateRendu: ["", Validators.required]});
 auteurFormGroup= this._formBuilder.group({auteur: ['', Validators.required]});
 remarqueFormGroup= this._formBuilder.group({remarque: ['']});
 noteFormGroup=this._formBuilder.group({note :[0,Validators.required]});
  matieres:Matiere[] = [];
  auteurs : User[] = [];


 constructor(
   private assignmentsService: AssignmentsService,
   private matieresService: MatiereService,
   private usersService: UsersService,
   private route: ActivatedRoute,
   private router: Router,
   private _formBuilder: FormBuilder,
   private _snackBar: MatSnackBar
 ) {}

 ngOnInit(): void {
  this.getAssignment();
   this.getMatiere();
   this.getAuteurs();
 }

 getAssignment() {
  const id = this.route.snapshot.params['id'];
  this.assignmentsService.getAssignment(id)
  .subscribe((assignment: Assignment | undefined) => {
    if (!assignment) return; // erreur ao am page home plus modal ana alerte kely oe tsy miexiste le izy 
    this.assignment = assignment;
    this.nomFormGroup.controls.nom.setValue(this.assignment.nom);
    this.matiereFormGroup.controls.matiere.setValue(this.assignment.matiere);
    this.dateRenduFormGroup.controls.dateRendu.setValue(new Date(this.assignment.dateRendu).toISOString());
    this.auteurFormGroup.controls.auteur.setValue(this.assignment.auteur);
    this.remarqueFormGroup.controls.remarque.setValue(this.assignment.remarque);
    this.noteFormGroup.controls.note.setValue(this.assignment.note)
  });
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
  });
}

editAssignment(){
  if(this.nomFormGroup.invalid ||
    this.matiereFormGroup.invalid ||
    this.dateRenduFormGroup.invalid ||
    this.auteurFormGroup.invalid || 
    this.noteFormGroup.invalid) return 
    if(this.noteFormGroup.controls.note.value<0 || this.noteFormGroup.controls.note.value>20 ) {
      this._snackBar.open("La note doit etre comprise entre 0 à 20", "OK", {
        duration: 3000,
        panelClass: ['red-snackbar'],
      }); return ;
    }
    

    const editAssignment = {
      _id : this.assignment._id,
      nom : this.nomFormGroup.controls.nom.value ,
      matiere : this.matiereFormGroup.controls.matiere.value,
      dateRendu : new Date(this.dateRenduFormGroup.controls.dateRendu.value),
      auteur : this.auteurFormGroup.controls.auteur.value,
      remarque : this.remarqueFormGroup.controls.remarque.value,
      note : this.noteFormGroup.controls.note.value
    };

    this.assignmentsService.updateAssignment(editAssignment)
    .subscribe({
      next: (message: any) => {
      this.router.navigate(["/home"]);
    },
    error: (error: any) => {
      this._snackBar.open(error.error, "OK", {
        duration: 3000,
        panelClass: ['red-snackbar'],
       });
    }});
  }
}

