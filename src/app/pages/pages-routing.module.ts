import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from '../shared/auth/auth.guard';
import { LoginComponent } from '../auth/login/login.component';


const routes: Routes = [
    {
      path: '',
      component: AssignmentsComponent
    },
    {
      path: 'home',
      component: AssignmentsComponent
    },
    {
      path: 'add',
      component: AddAssignmentComponent
    },
    {
      path: 'assignments/:id',
      component: AssignmentDetailComponent
    },
    {
      path: 'assignments/:id/edit',
      component: EditAssignmentComponent,
      canActivate: [authGuard]
    },
    {
      path: 'login',
      component: LoginComponent
    }
  ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}