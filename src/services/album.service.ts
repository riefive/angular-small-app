import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.http';
import { Album } from 'src/types/album.type';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private tupleName = 'albums'

  constructor(private http: HttpClient) {}

  get(filters: { page?: number, limit?: number } | any = null) {
    let params = {}
    if (filters) {
      params = new HttpParams({ fromString: `_page=${filters.page}&_limit=${filters.limit}`})
    }  
    return this.http.get<Album[]>(`${environment.apiUrl}/${this.tupleName}`, { responseType: 'json', params })
      .pipe(retry(3))
      .pipe<Album[]>(
        catchError(handleError)
      );
  }
}
