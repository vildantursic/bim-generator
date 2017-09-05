import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdCardModule,
  MdGridListModule,
  MdChipsModule,
  MdTableModule,
  MdProgressBarModule,
  MdDialogModule,
  MdSortModule,
  MdMenuModule,
  MdSnackBarModule,
  MdPaginatorModule,
  MdTooltipModule,
  MdSelectModule,
  MdTabsModule,
  MdButtonToggleModule,
  MdSliderModule,
  MdAutocompleteModule,
  MdSlideToggleModule
} from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdInputModule,
    MdListModule,
    MdSidenavModule,
    MdIconModule,
    MdCardModule,
    MdGridListModule,
    MdChipsModule,
    MdTableModule,
    MdProgressBarModule,
    MdDialogModule,
    MdSortModule,
    MdMenuModule,
    MdSnackBarModule,
    MdPaginatorModule,
    MdTooltipModule,
    MdSelectModule,
    MdTabsModule,
    MdButtonToggleModule,
    MdSliderModule,
    MdAutocompleteModule,
    MdSlideToggleModule
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ]
})
export class MaterialDesignModule { }
