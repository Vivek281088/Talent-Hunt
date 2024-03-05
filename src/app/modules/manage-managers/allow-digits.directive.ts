import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAllowDigits]'
})
export class AllowDigitsDirective {

  constructor() { }
  @Input('appAllowDigits') appAllowDigits !: string;

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement) {
    const inputValue = target.value;
    const onlyDigits = inputValue.replace(/\D/g, ''); 
    const threeDigits = onlyDigits.slice(0, +this.appAllowDigits); 

    target.value = threeDigits; 
    if (threeDigits.length >= +this.appAllowDigits) {
      target.setAttribute('maxlength', this.appAllowDigits); 
    } else {
      target.removeAttribute('maxlength'); 
    }
}

}
