import { NgModule } from '@angular/core';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from '../shared/components/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DatePipe } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/module/shared.module';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { ProfilComponent } from './profil/profil.component';
import { AssignementNotationComponent } from './assignments/assignement-notation/assignement-notation.component';

@NgModule({
  
  declarations: [
    PagesComponent,
    AssignmentsComponent,
    AddAssignmentComponent,
    AssignmentDetailComponent,
    EditAssignmentComponent,
    NavbarComponent,
    SidebarComponent,
    ProfilComponent,
    AssignementNotationComponent
    ],
    imports: [PagesRoutingModule,SharedModule, DatePipe],
    providers: [DatePipe],
})
export class PagesModule {}