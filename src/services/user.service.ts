import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry, of } from 'rxjs';
import { environment } from 'src/environment/env';
import { getDecodeToken, handleError } from 'src/helpers/helper.http';
import { User } from 'src/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tupleName = 'users'
  private user = '';
  private properties: any = {}
  private router = inject(Router)

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

  login(user: string, pass: string) {
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

  loginJwt(user: string, password: string) {
    const payload = { email: user, password }
    const fetching = this.http.post(`${environment.apiUrlFake}/v1/auth/login`, payload, { responseType: 'json' })
      .pipe(retry(1))
      .pipe(
        catchError(handleError)
      )
      .subscribe((res) => {
        if (!res) {
          alert('Gagal login')
          return false;
        } else {
          const decoded = getDecodeToken(res?.access_token)
          if (decoded) {
            this.setProperties(decoded)
            this.setUser(user)
          }
          this.router.navigateByUrl('/')
          return true;
        }
      });
    return fetching;
  }

  private setUser(user: string) {
    this.user = user;
  }

  private setProperties(data: any) {
    this.properties = data;
  }

  public clear() {
    this.setUser('')
    this.setProperties({})
  }

  public isLoggedIn() {
    return this.user.length > 0;
  }
}
