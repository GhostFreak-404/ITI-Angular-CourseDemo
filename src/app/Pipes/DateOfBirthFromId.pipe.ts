import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateOfBirthFromId',
})
export class DateOfBirthFromIdPipe implements PipeTransform {
  transform(value: string, format: string = 'FullDate'): any {
    let Day = value[5] + value[6]; //01-09-1999 //2 99 09 01 1509345
    let Month = value[3] + value[4];
    let Year = value[1] + value[2];

    if (value[0] == '2') {
      Year = `19${Year}`;
    } else if (value[0] == '3') {
      Year = `20${Year}`;
    }

    let FullDate = `${Day}-${Month}-${Year}`;

    switch (format) {
      case 'YY':
        return `${Year}`;
        break;
      case 'MM':
        return Month;
        break;
      case 'DD':
        return Day;
        break;
      case 'FullDate':
        return FullDate;
        break;
      default:
        return FullDate;
        break;
    }
  }
}
