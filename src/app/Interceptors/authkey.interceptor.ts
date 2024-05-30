import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../shared/loader/loader.service';

@Injectable()
export class AuthkeyInterceptor implements HttpInterceptor {
  API_KEY : string  = process.env.API_KEY as string;   
  constructor(private loaderService : LoaderService) {}
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true);
    const authReq = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
          .set('x-api-key',this.API_KEY )
  });
    return next.handle(authReq).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false)
        }
      )
    )
  }
}
