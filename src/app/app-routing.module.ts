import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [ 
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [AuthGuard],
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