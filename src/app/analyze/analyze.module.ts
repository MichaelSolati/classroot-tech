import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { AnalyzeComponent } from './analyze.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AnalyzeRoutingModule
  ],
  declarations: [
    AnalyzeComponent,
    SelectComponent
  ],
  entryComponents: [
    SelectComponent
  ]
})
export class AnalyzeModule { }
