import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  get(filters: { page?: number, limit?: number } | any = null) {
    let params = {}
    if (filters) {
      params = new HttpParams({ fromString: `_page=${filters.page}&_limit=${filters.limit}`})
    }  
    return this.http.get<Todo[]>(`${environment.apiUrl}/${this.tupleName}`, { responseType: 'json', params })
      .pipe(retry(3))
      .pipe<Todo[]>(
        catchError(handleError)
      );
  }

  getOne(id: number) {
    return this.http.get<Todo>(`${environment.apiUrl}/${this.tupleName}/${id}`, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Todo>(
        catchError(handleError)
      );
  }

  insert(payload: any) {
    return this.http.post<Todo>(`${environment.apiUrl}/${this.tupleName}`, payload, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Todo>(
        catchError(handleError)
      );
  }

  update(id: number, payload: any) {
    return this.http.put<Todo>(`${environment.apiUrl}/${this.tupleName}/${id}`, payload, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Todo>(
        catchError(handleError)
      );
  }

  remove(id: number) {
    return this.http.delete<Todo>(`${environment.apiUrl}/${this.tupleName}/${id}`, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Todo>(
        catchError(handleError)
      );
  }
}

