import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.error';
import { User } from 'src/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tupleName = 'users'

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.tupleName}`)
      .pipe(retry(3))
      .pipe<User[]>(
        catchError(handleError)
      );
  }
}
