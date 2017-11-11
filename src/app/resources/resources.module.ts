import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources.component';
import { PageComponent } from './page/page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ResourcesRoutingModule
  ],
  declarations: [
    ResourcesComponent,
    PageComponent
  ]
})
export class ResourcesModule { }
