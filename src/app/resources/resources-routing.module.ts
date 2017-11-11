import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcesComponent } from './resources.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: ResourcesComponent
}, {
  path: ':id',
  component: PageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
