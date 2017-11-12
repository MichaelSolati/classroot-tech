import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LearnRoutingModule
  ],
  declarations: [
    LearnComponent
  ]
})
export class LearnModule { }
