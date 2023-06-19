import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Assignment } from '../../shared/model/assignment.model';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { User } from 'src/app/shared/model/user.dto';
import { Matiere } from 'src/app/shared/model/matiere.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs à rendre";
  // les données à afficher
  assignments:Assignment[] = [];

  assignment : Assignment| undefined;
  // Pour la data table
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];
  user!: User;

  // propriétés pour la pagination
  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  
;

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(private assignmentsService:AssignmentsService,
              private ngZone: NgZone,
              private router:Router,
              private _snackBar: MatSnackBar) {    
  }
  
  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    this.user= JSON.parse(localStorage.getItem('user')!);
    this.getAssignments();
  }

  ngAfterViewInit() { 
    console.log("after view init");

    if(!this.scroller) return;

    // on s'abonne à l'évènement scroll de la liste
    this.scroller.elementScrolled()
    .pipe(
      tap(event => {
        //console.log(event);
      }),
      map(event => {
         return this.scroller.measureScrollOffset('bottom');
      }),
      tap(y => {
        //console.log("y = " + y);
      }),
      pairwise(),
      tap(([y1, y2]) => {
        //console.log("y1 = " + y1 + " y2 = " + y2);
      }),
      filter(([y1, y2]) => {
        return y2 < y1 && y2 < 100;
      }),
      // Pour n'envoyer des requêtes que toutes les 200ms
      //throttleTime(200)
    )
    .subscribe((val) => {
      console.log("val = " + val);
      console.log("je CHARGE DE NOUVELLES DONNEES page = " + this.page);
      this.ngZone.run(() => {
        if(!this.hasNextPage) return;

        this.page = this.nextPage;
        this.getAddAssignmentsForScroll();
      });
    });
  }

  detail(item : Assignment){
    this.assignment = item;
    
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
    let matiere = (this.user.type === "prof") ? this.user._id : null ;
    this.assignmentsService.getAssignments(this.page, this.limit,matiere,auteur)
    .subscribe(data => {
      this.assignments = data.docs;
      console.log(this.assignments);
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Données reçues");
    });
  }

  getAddAssignmentsForScroll() {
    this.assignmentsService.getAssignments(this.page, this.limit, null ,null)
    .subscribe(data => {
      // au lieu de remplacer le tableau, on va concaténer les nouvelles données
      this.assignments = this.assignments.concat(data.docs);
      // ou comme ceci this.assignments = [...this.assignments, ...data.docs]
      //this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Données ajoutées pour scrolling");
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
