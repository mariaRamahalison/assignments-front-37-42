import { NgModule } from '@angular/core';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent } from '../auth/login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DatePipe } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/module/shared.module';

@NgModule({
  declarations: [
    PagesComponent,
    AssignmentsComponent,
    AddAssignmentComponent,
    AssignmentDetailComponent,
    EditAssignmentComponent,
    LoginComponent,
    ],
  imports: [PagesRoutingModule,SharedModule, DatePipe],
  providers: [DatePipe],
})
export class PagesModule {}