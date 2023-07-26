import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eRate'
})
export class ExchangeRatePipe implements PipeTransform {

  transform(value: number, rate:number=15): number {
    return value * rate;
  }

}
