import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/services/todo.service';
import { Todo } from 'src/types/todo.type';

@Component({
  selector: 'app-todo-id',
  templateUrl: './todo-id.component.html',
  styleUrls: ['./todo-id.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class TodoIdComponent implements OnInit {
  public item: Todo = { userId: 0, id: 0, title: '', completed: false }
  public detailId = 0

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((result: any) => {
      this.detailId = Number(result.params?.id) || 0
      this.todoService.getOne(this.detailId).subscribe((result: Todo) => {
        this.item.id = result.id
        this.item.title = result.title
        this.item.completed = result.completed
      })
    });
  }
}
