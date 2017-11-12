import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'about',
  loadChildren: 'app/about/about.module#AboutModule'
}, {
  path: 'analyze',
  loadChildren: 'app/analyze/analyze.module#AnalyzeModule'
}, {
  path: 'resources',
  loadChildren: 'app/resources/resources.module#ResourcesModule'
}, {
  path: '',
  loadChildren: 'app/home/home.module#HomeModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
