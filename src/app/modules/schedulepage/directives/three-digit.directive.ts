import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appThreeDigit]'
})
export class ThreeDigitDirective {

  constructor(private el: ElementRef) { }
 
  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement) {
    const inputValue = target.value;
    const onlyDigits = inputValue.replace(/\D/g, ''); // Remove non-digit characters
    const threeDigits = onlyDigits.slice(0, 3); // Take only the first three digits
    
    target.value = threeDigits; // Update the input value
    if (threeDigits.length >= 3) {
      target.setAttribute('maxlength', '3'); // Set maxlength attribute to 3 to restrict further input
    } else {
      target.removeAttribute('maxlength'); // Remove maxlength attribute if less than three digits
    }
}
}
