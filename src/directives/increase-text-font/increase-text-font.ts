import { Directive, Renderer, ElementRef } from '@angular/core';

/**
 * Generated class for the IncreaseTextFontDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[appIncreaseTextFont]', // Attribute selector
  host: {
    '(click)' : 'handleClick($event)' //Directive will fire on click event
  }
})
export class IncreaseTextFontDirective {

  constructor( public element: ElementRef, public renderer: Renderer ) {}

  handleClick(ev) {
    this.element.nativeElement.style.transition = 'font-size 2s, color 2s';
    this.element.nativeElement.style.fontSize = '2.0em';
    this.element.nativeElement.style.color = 'orange';
    setTimeout( () => {
      this.element.nativeElement.style.transition = 'font-size 2s, color 2s';
      this.element.nativeElement.style.fontSize = 'inherit';
      this.element.nativeElement.style.color = 'inherit';
    }, 3000);
  }

}
