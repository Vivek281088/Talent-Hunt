import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthkeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
          .set('x-api-key', 'KdUaeZD83v1xSSPQH8Ehy7qoUvmxp3Q82tdHYrZo')
  });
    return next.handle(authReq);
  }
}
