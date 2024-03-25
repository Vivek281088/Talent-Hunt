import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn : 'root',
})
export class CustomHttpException implements ErrorHandler{
    constructor(private messageService : MessageService ,private zone : NgZone){}
    
    handleError(error: any): void {
      
        console.log("Inside custom error file", error)
            this.messageService.add({
                severity : 'error',
                summary : error.message,
               
            })
    
  }
}