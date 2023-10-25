import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommentComponent } from './comment.component';

const routes: Routes = [
  { path: '', component: CommentComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommentComponent]
})
export class CommentModule { }
