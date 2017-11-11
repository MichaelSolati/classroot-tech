import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
