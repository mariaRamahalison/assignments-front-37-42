import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { MatieresService } from 'src/app/shared/services/matieres.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/model/user.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

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

 firstFormGroup = this._formBuilder.group({nom: ['', Validators.required],});
 secondFormGroup = this._formBuilder.group({matiere: ['', Validators.required],});
 thirdFormGroup = this._formBuilder.group({dateRendu: ["", Validators.required],});
 fourthFormGroup= this._formBuilder.group({auteur: ['', Validators.required], });
 fifthFormGroup= this._formBuilder.group({remarque: ['']});

  matieres:Matiere[] = [];
  auteurs : User[] = [];

 constructor(
   private assignmentsService: AssignmentsService,
   private matieresService: MatieresService,
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
    this.firstFormGroup.controls.nom.setValue(this.assignment.nom);
    this.secondFormGroup.controls.matiere.setValue(this.assignment.matiere);
    this.thirdFormGroup.controls.dateRendu.setValue(new Date(this.assignment.dateRendu).toISOString());
    this.fourthFormGroup.controls.auteur.setValue(this.assignment.auteur);
    this.fifthFormGroup.controls.remarque.setValue(this.assignment.remarque);
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
  if(this.firstFormGroup.invalid ||
    this.secondFormGroup.invalid ||
    this.thirdFormGroup.invalid ||
    this.fourthFormGroup.invalid ) return ;

    const editAssignment = {
      _id : this.assignment._id,
      nom : this.firstFormGroup.controls.nom.value ,
      matiere : this.secondFormGroup.controls.matiere.value,
      dateRendu : new Date(this.thirdFormGroup.controls.dateRendu.value),
      auteur : this.fourthFormGroup.controls.auteur.value,
      remarque : this.fifthFormGroup.controls.remarque.value
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

