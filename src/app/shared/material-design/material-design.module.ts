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
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
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
    CdkTableModule,
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
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ]
})
export class MaterialDesignModule { }
