import { NgModule } from '@angular/core';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent } from '../auth/login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    AssignmentsComponent,
    AddAssignmentComponent,
    AssignmentDetailComponent,
    EditAssignmentComponent,
    LoginComponent,
    ],
  imports: [PagesRoutingModule,FormsModule, 
    HttpClientModule,
    MatNativeDateModule, ScrollingModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule,
    MatTableModule, MatPaginatorModule,DatePipe],
  providers: [DatePipe],
})
export class PagesModule {}