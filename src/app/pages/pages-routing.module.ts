import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from '../shared/services/auth/auth.guard';
import { PagesComponent } from './pages.component';
import { ProfilComponent } from './profil/profil.component';
import { AssignementNotationComponent } from './assignments/assignement-notation/assignement-notation.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: AssignmentsComponent
      },
      {
        path: 'add',
        component: AddAssignmentComponent,
      },
      {
        path: 'assignments/edit/:id',
        component: EditAssignmentComponent,
      },
      {
        path: 'profil',
        component: ProfilComponent
      },
      {
        path: 'assignments/notation',
        component: AssignementNotationComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}