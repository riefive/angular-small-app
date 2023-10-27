import { Observable, of } from 'rxjs';

export const getDecodeToken = (jwtToken: string) => {
  if (!jwtToken || (typeof jwtToken === 'string' && jwtToken?.trim()?.length === 0) || typeof window === 'undefined') return null
  const jwtArrays = jwtToken.split('.')
  const jwtPayloads: any = jwtArrays.length > 1 ? jwtArrays[1] : null
  try {
    const parsedToken = JSON.parse(window.atob(jwtPayloads))
    return parsedToken
  } catch (_error) {
    return null
  }
}

export function handleError(err: any, caught: Observable<any>) {
  return of(null);
}