import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcesComponent } from './resources.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: ResourcesComponent
}, {
  path: '**',
  redirectTo: '/resources'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
