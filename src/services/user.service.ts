import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry, of } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.error';
import { User } from 'src/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tupleName = 'users'

  private user = '';

  constructor(private http: HttpClient) {}

  get(filters: { page?: number, limit?: number } | any = null) {
    let params = {}
    if (filters) {
      params = new HttpParams({ fromString: `_page=${filters.page}&_limit=${filters.limit}`})
    }  
    return this.http.get<User[]>(`${environment.apiUrl}/${this.tupleName}`, { responseType: 'json', params })
      .pipe(retry(3))
      .pipe<User[]>(
        catchError(handleError)
      );
  }

  login(user: string, pass: string)
  {
    let result = {
      status: false
    };

    if (user == 'admin' && pass == 'admin')
      result.status = true;

    return of(result)
      .pipe((obj) => {
        obj.subscribe(r => {
          this.setUser(user);
        });
        return obj;
      }); 
  }

  private setUser(user: string)
  {
    this.user = user;
  }

  public isLoggedIn()
  {
    return this.user.length > 0;
  }
}
