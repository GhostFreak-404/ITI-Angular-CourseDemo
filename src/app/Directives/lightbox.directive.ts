import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[Lightbox]',
})
export class LightboxDirective implements OnInit {
  // @HostBinding('style.border') border = '3px solid green';

  @Input('Lightbox') HighLighted: string = 'blue'

  constructor(private elemRef: ElementRef) {
    // elemRef.nativeElement.style.border = "2px solid green;";
  }

  @HostListener('mouseenter') OnEnter(){
    this.elemRef.nativeElement.style.border = `3px solid ${this.HighLighted}`;
  }

  @HostListener('mouseleave') OnLeave(){
    this.elemRef.nativeElement.style.border = '3px solid green';
  }

  ngOnInit() {
    this.elemRef.nativeElement.style.border = '2px solid green';
  }
}
