import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Assignment } from '../../shared/model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { User } from 'src/app/shared/model/user.dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignmentDetailComponent } from 'src/app/shared/components/assignment-detail/assignment-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs à rendre";
  assignments:Assignment[] = [];
  assignment : Assignment| undefined;
  user!: User;
  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  
  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {    
  }
  
  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('user')!);
    this.getAssignments();
  }


  detail(item : Assignment){
    this.assignment = item;
    this.dialog.open(AssignmentDetailComponent, {
      data : {
        assignmentTransmis: item,
        notation: false
      }
    });
  }

  edit(item :Assignment){
    this.assignment = item;
    this.router.navigate(['/assignments/edit', this.assignment._id]);
  }

  delete(assignment : Assignment ){
    this.assignmentsService.deleteAssignment(assignment._id)
      .subscribe({
        next: (message: any) => {
          this.getAssignments();
          this._snackBar.open("Assignement supprimé avec succès", "OK", {
            duration: 3000,
            panelClass: ['green-snackbar'],
           });
      },
      error: (error: any) => {
        this._snackBar.open(error.error, "OK", {
          duration: 3000,
          panelClass: ['red-snackbar'],
         });
      }
    });
  }

  getAssignments() {
    console.log("On va chercher les assignments dans le service");
    let auteur = (this.user.type === "etudiant") ? this.user._id : null ;
    let professeur = (this.user.type === "prof") ? this.user._id : null ;
    this.assignmentsService.getAssignments(this.page, this.limit,professeur,auteur)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  isAdmin(){
    return this.user?.type === "admin";
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);
   
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignments();
  }
}
