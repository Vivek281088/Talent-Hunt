import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNameInput]'
})
export class NameInputDirective {

  constructor(private el :ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event:any) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
    inputValue = inputValue.replace(/[^a-zA-Z\s]|(\s{2,})/g, '');
    inputElement.value = inputValue;
  

}
}
