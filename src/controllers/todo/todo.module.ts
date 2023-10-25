import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { TodoComponent } from './todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoComponent]
})
export class TodoModule { }
