import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from '../shared/services/auth/auth.guard';
import { PagesComponent } from './pages.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
        // canActivate: [AuthGuard],
      },
      {
        path: 'home',
        component: AssignmentsComponent
      },
      {
        path: 'add',
        component: AddAssignmentComponent,
        canActivate: [authGuard]
      },
      {
        path: 'assignments/:id',
        component: AssignmentDetailComponent
      },
      {
        path: 'assignments/edit/:id',
        component: EditAssignmentComponent,
        canActivate: [authGuard]
      },
      {
        path: 'profil',
        component: ProfilComponent
      },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}