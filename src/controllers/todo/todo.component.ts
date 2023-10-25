import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/services/todo.service';
import { Todo } from 'src/types/todo.type';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: Todo[] = []

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.displayedColumns = ['title', 'completed']
    this.todoService.get().subscribe((result: Todo[]) => {
      console.log(result)
      this.displayedData = result
    })
  }
}
