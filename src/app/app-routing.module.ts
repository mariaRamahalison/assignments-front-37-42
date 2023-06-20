import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard, connectGuard } from './shared/services/auth/auth.guard';
const routes: Routes = [ 
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [connectGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./shared/components/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}