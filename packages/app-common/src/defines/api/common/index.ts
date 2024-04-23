import { HttpStatusCode } from 'axios';

export interface ResponseEntity<T> {
  status: HttpStatusCode;
  errorMessage: string;
  data: T;
}
