import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyzeComponent } from './analyze.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: AnalyzeComponent
}, {
  path: '**',
  redirectTo: '/analyze'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzeRoutingModule { }
