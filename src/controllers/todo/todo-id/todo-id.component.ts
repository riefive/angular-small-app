import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkInvalid, getFormControl } from 'src/helpers/helper.form';
import { TodoService } from 'src/services/todo.service';
import { Todo } from 'src/types/todo.type';

interface TodoInput {
  id: FormControl <string|number|null>,
  userId: FormControl <string|number|null>,
  title: FormControl <string|null>,
  completed: FormControl<boolean|null>,
}

@Component({
  selector: 'app-todo-id',
  templateUrl: './todo-id.component.html',
  styleUrls: ['./todo-id.component.css'],
})
export class TodoIdComponent implements OnInit {
  public item: Todo = { userId: 0, id: 0, title: '', completed: false }
  public form!: FormGroup<TodoInput>;
  public detailId = 0
  public mode = 'add'

  constructor(private route: ActivatedRoute, private router: Router, private builder: FormBuilder, private todoService: TodoService) { }

  checkInvalidLocal(name: string) {
    return checkInvalid(this.form, name)
  }

  getFormControlLocal(name: string) {
    return getFormControl(this.form, name)
  }

  handleButtonClick(type: string) {
    if (type === 'cancel') {
      this.router.navigateByUrl('/todo')
    }
  }

  handleSubmit() {
    if (this.form.invalid) return;
    const formValue = this.form.value
    if (this.mode === 'edit') {
      this.todoService.update(this.detailId, formValue).subscribe((result: Todo) => {
        if (result) this.router.navigateByUrl('/todo')
      })
    } else {
      this.todoService.insert(formValue).subscribe((result: Todo) => {
        if (result) this.router.navigateByUrl('/todo')
      })
    }
  }

  ngOnInit() {
    this.form = this.builder.group<TodoInput>({
      id: new FormControl(0, Validators.required),
      userId: new FormControl(0, Validators.required),
      title: new FormControl('', Validators.required),
      completed: new FormControl(false),
    });

    this.route.paramMap.subscribe((result: any) => {
      this.detailId = Number(result.params?.id) || 0
      this.mode = result.params?.id !== 'create' && this.detailId > 0 ? 'edit' : 'add'
      if (!this.detailId || this.detailId === 0) return
      this.todoService.getOne(this.detailId).subscribe((result: Todo) => {
        this.item.id = result.id
        this.item.userId = result.userId
        this.item.title = result.title
        this.item.completed = result.completed
        this.form.setValue(this.item)
      })
    });
  }
}
