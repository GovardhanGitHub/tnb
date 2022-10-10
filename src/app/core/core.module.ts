import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoCommaPipe } from './no-comma.pipe';

@NgModule({
  declarations: [
    NoCommaPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
