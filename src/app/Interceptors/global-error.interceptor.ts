import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {

  constructor(private messageService : MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((err : Error) =>{
        console.log('error caught by Interceptor' , err);
        this.messageService.add({
          severity : 'error',
          summary : err.name,
          detail : err.message
      })
        return throwError(()=> {
          console.log("error in the throw error block" )
          return err;
        })
      })
    );
  }
}
