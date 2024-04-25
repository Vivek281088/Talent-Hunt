import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("sending through interceptor");
    let modifiedRequest=req.clone({
      headers:req.headers.append('content-Type','application/json' )

    })
    return next.handle(modifiedRequest);


  }
 
}
