import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatChipsModule,
  MatProgressBarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatFormFieldModule
} from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTabsModule,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ]
})
export class MaterialDesignModule { }
