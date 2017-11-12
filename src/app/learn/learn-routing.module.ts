import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnComponent } from './learn.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: LearnComponent
}, {
  path: '**',
  redirectTo: '/learn'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }
