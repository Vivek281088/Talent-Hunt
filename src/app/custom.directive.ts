import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange() {
    const initialValue = this.el.nativeElement.value;
    const digitsOnly = initialValue.replace(/[^\d]/g, ''); // Remove non-numeric characters

    if (digitsOnly.length > 7) {
      console.log("custom directive",digitsOnly)
      this.el.nativeElement.value = digitsOnly.slice(0, 7); // Truncate to 7 digits
    } else {
      this.el.nativeElement.value = digitsOnly; // Update input value with digits only
    }
  }

}
