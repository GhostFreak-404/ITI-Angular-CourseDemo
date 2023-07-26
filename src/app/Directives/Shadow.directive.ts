import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[Shadow]',
})
export class ShadowDirective implements OnInit {

  @Input('Shadow') color: string = "rgba(0, 0, 0, 0.15)";
  @HostListener('mouseenter') enter() {
    this.element.nativeElement.style.boxShadow =
      'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px';
  }
  @HostListener('mouseleave') leave() {
    this.element.nativeElement.style.boxShadow =
      `${this.color} 1.95px 1.95px 2.6px`;
  }

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.boxShadow =
    `rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px`;
    /* this.element.nativeElement.style.boxShadow =
    `${this.color} 1.95px 1.95px 2.6px`; */ //this wont work
  }

  ngOnInit() {
    // this.element.nativeElement.style.boxShadow = 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
  }
}
