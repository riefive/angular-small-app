import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/env';
import { handleError } from 'src/helpers/helper.error';
import { Album } from 'src/types/album.type';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private tupleName = 'albums'

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Album[]>(`${environment.apiUrl}/${this.tupleName}`)
      .pipe(retry(3))
      .pipe<Album[]>(
        catchError(handleError)
      );
  }
}
