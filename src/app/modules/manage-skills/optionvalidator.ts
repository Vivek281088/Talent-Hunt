import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";


export function optionValodator() : ValidatorFn{
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return new Observable(observer => {
          const value = control.value;
          if (!value) {
            observer.next(null); 
            observer.complete();
            return;
          }
          const valueWithoutSpaces = value.replace(/\s/g, '');
          const isValid = isNaN(valueWithoutSpaces) ? valueWithoutSpaces.length >= 2 : valueWithoutSpaces.length >= 1;
          observer.next(isValid ? null : { 'minLength': true });
          observer.complete();
        });
      };
}