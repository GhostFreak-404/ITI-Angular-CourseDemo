import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CreditCardFormat'
})
export class CreditCardFormatPipe implements PipeTransform {

  transform(value: string): any {
    let final = value.slice(0,4) + " - "+ value.slice(5,9) + " - "+ value.slice(10,14) + " - "+ value.slice(14,)
    return final;
  }

}
