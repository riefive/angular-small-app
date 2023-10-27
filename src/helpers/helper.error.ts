import { Observable, of } from 'rxjs';

export function handleError(err: any, caught: Observable<any>) {
  return of([]);
}