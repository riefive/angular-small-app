import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.http';
import { Post } from 'src/types/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private tupleName = 'posts'

  constructor(private http: HttpClient) {}

  get(filters: { page?: number, limit?: number } | any = null) {
    let params = {}
    if (filters) {
      params = new HttpParams({ fromString: `_page=${filters.page}&_limit=${filters.limit}`})
    }
    return this.http.get<Post[]>(`${environment.apiUrl}/${this.tupleName}`, { responseType: 'json', params })
      .pipe(retry(3))
      .pipe<Post[]>(
        catchError(handleError)
      );
  }

  getOne(id: number) {
    return this.http.get<Post>(`${environment.apiUrl}/${this.tupleName}/${id}`, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Post>(
        catchError(handleError)
      );
  }

  insert(payload: any) {
    return this.http.post<Post>(`${environment.apiUrl}/${this.tupleName}`, payload, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Post>(
        catchError(handleError)
      );
  }

  update(id: number, payload: any) {
    return this.http.put<Post>(`${environment.apiUrl}/${this.tupleName}/${id}`, payload, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Post>(
        catchError(handleError)
      );
  }

  remove(id: number) {
    return this.http.delete<Post>(`${environment.apiUrl}/${this.tupleName}/${id}`, { responseType: 'json' })
      .pipe(retry(3))
      .pipe<Post>(
        catchError(handleError)
      );
  }
}
