import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.http';
import { Photo } from 'src/types/photo.type';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private tupleName = 'photos'

  constructor(private http: HttpClient) {}

  get(filters: { page?: number, limit?: number } | any = null) {
    let params = {}
    if (filters) {
      params = new HttpParams({ fromString: `_page=${filters.page}&_limit=${filters.limit}`})
    }  
    return this.http.get<Photo[]>(`${environment.apiUrl}/${this.tupleName}`, { responseType: 'json', params })
      .pipe(retry(3))
      .pipe<Photo[]>(
        catchError(handleError)
      );
  }
}
