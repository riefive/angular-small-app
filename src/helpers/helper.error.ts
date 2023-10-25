import { Observable } from 'rxjs';

export function handleError(err: any, caught: Observable<any>) {
  console.log(err);
  console.log(caught);
  return caught;
}