import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/model/user.dto';
import { Assignment } from 'src/app/shared/model/assignment.model';
import { MatDialog, } from '@angular/material/dialog';
import { AssignmentDetailComponent } from 'src/app/shared/components/assignment-detail/assignment-detail.component';

@Component({
  selector: 'app-assignement-notation',
  templateUrl: './assignement-notation.component.html',
  styleUrls: ['./assignement-notation.component.css']
})
export class AssignementNotationComponent { 

  user!: User;
  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  assignments:Assignment[] = [];
  assignmentsDone:Assignment[] = [];

  
  constructor(
    private assignmentsService:AssignmentsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) 
    {}

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('user')!);
    this.getAssignments();
  }

  drop(event: CdkDragDrop<string[]> ) {
    if (event.previousContainer === event.container) 
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else this.openDialog(event.item.data, event)
  }



  openDialog(item : Assignment , event: CdkDragDrop<string[]>): void {
    let dialogRef = this.dialog.open(AssignmentDetailComponent, {
      data: {assignmentTransmis: item , notation :true },
    });
    dialogRef.afterClosed().subscribe(action=> {
      if(action === "notation"){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    });
  }

  getAssignments() {
    this.assignmentsService.getAssignments(this.page, this.limit,this.user._id,null)
    .subscribe(data => {
      this.assignments=[];
      this.assignmentsDone=[];
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      data.docs.forEach(element => {
        if(!element.rendu) this.assignments.push(element);
        else this.assignmentsDone.push(element)
      });
    });
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
