import { Component, OnInit , Inject} from '@angular/core';
import { Assignment } from '../../../shared/model/assignment.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AssignmentsService } from '../../../shared/services/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getPhotoUtilBis } from 'src/app/shared/utils/diplayImage';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  formGroup!: FormGroup;
  assignmentTransmis : Assignment;
  notation : boolean = false ; 

  

  constructor(
    private assignmentsService: AssignmentsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { assignmentTransmis : Assignment , notation : boolean }
    ) { }

    
  ngOnInit(): void {
    this.assignmentTransmis = this.data.assignmentTransmis;
    this.notation= this.data.notation;
    this.formGroup = this.fb.group({
      note: [null, [Validators.required , Validators.min(0) ,Validators.max(20) ]],
      remarque: [null]
    });

    // console.log(this.notation);
  }

  ngAfterInit(){
   
  }

  noter(){
    if(this.formGroup.invalid) return ;
      const editAssignment = {
        _id : this.assignmentTransmis._id,
        nom : this.assignmentTransmis.nom,
        matiere : this.assignmentTransmis.matiere,
        dateRendu : this.assignmentTransmis.dateRendu,
        auteur : this.assignmentTransmis.auteur,
        note : this.formGroup.controls['note'].value,
        remarque : this.formGroup.controls['remarque'].value,
        rendu : true
      };


      this.assignmentsService.updateAssignment(editAssignment)
      .subscribe({
        next: (message: any) => {
          this.dialogRef.close('notation');
      },
      error: (error: any) => {
        console.log("hoho");
        this._snackBar.open(error.error, "OK", {
          duration: 3000,
          panelClass: ['red-snackbar'],
         });
      }});
  }

  getPhotoIllu(items:any){
    return getPhotoUtilBis(items.photo);
}

  
}
