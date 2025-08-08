import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[disableAfterClick]',
  standalone: true
})
export class DisableAfterClickDirective {
  @Input() disableTime = 2000; // ms

  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick() {
    this.el.nativeElement.disabled = true;
    setTimeout(() => this.el.nativeElement.disabled = false, this.disableTime);
  }
}
