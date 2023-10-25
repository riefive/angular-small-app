import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.error';
import { Post } from 'src/types/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private tupleName = 'posts'

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Post[]>(`${environment.apiUrl}/${this.tupleName}`)
      .pipe(retry(3))
      .pipe<Post[]>(
        catchError(handleError)
      );
  }
}

