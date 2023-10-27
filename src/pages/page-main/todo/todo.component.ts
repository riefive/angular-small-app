import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/services/todo.service';
import { ModalRemoveDialogComponent } from 'src/components/modal-remove-dialog/modal-remove-dialog.component';
import { Todo } from 'src/types/todo.type';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: Todo[] = []
  public length = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 50];
  pageEvent: any;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private todoService: TodoService) { }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleFetchTodo(this.pageIndex + 1, this.pageSize)
  }

  handleClickAdd() {
    this.router.navigate(['create'], { relativeTo: this.route })
  }

  handleClickDetail(id: number) {
    this.router.navigate([id], { relativeTo: this.route })
  }

  handleOpenDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: string): void {
    const dialogRef = this.dialog.open(ModalRemoveDialogComponent, {
      data: {
        name: element,
      },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.name && result.isYes) {
        this.todoService.remove(Number(element)).subscribe()
      }
    });
  }

  handleFetchTodo(page = 0, limit = 10) {
    const params = { page, limit }
    this.todoService.get(params).subscribe((result: Todo[]) => {
      this.displayedData = result
    })
  }

  handleFetchTodoCount() {
    this.todoService.get().subscribe((result: Todo[]) => {
      this.length = result?.length || 0
    })
  }

  ngOnInit() {
    this.displayedColumns = ['id', 'userId', 'title', 'completed', 'actions']
    this.handleFetchTodo()
    this.handleFetchTodoCount()
  }
}
