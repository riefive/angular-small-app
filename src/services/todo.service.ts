import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.error';
import { Todo } from 'src/types/todo.type';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private tupleName = 'todos'

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Todo[]>(`${environment.apiUrl}/${this.tupleName}`)
      .pipe(retry(3))
      .pipe<Todo[]>(
        catchError(handleError)
      );
  }
}

