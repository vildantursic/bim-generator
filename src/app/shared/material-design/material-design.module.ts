import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdToolbarModule,
  MdInputModule,
  MdListModule,
  MdIconModule,
  MdCardModule,
  MdGridListModule,
  MdChipsModule,
  MdProgressBarModule,
  MdMenuModule,
  MdSnackBarModule,
  MdSelectModule,
  MdSlideToggleModule
} from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  exports: [
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdListModule,
    MdIconModule,
    MdCardModule,
    MdGridListModule,
    MdChipsModule,
    MdProgressBarModule,
    MdMenuModule,
    MdSnackBarModule,
    MdSelectModule,
    MdSlideToggleModule
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ]
})
export class MaterialDesignModule { }
