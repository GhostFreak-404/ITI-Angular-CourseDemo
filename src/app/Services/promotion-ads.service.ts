import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionAdsService implements OnInit, OnDestroy {
  listOfAds: string[];

  constructor() {
    this.listOfAds = [
      'Revolutionize your world with our demos',
      'Get a sneak peek of the future with our demos',
      'Discovering the possibilities with our demos',
      'Demo technology for better tomorrows',
      'Try the change, be the change'
    ];
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  getTimedAds(timeInSec: number) {
    let counter = 0;
    return new Observable((observer) => {
      let Interval = setInterval(() => {
        // console.log('In Interval');
        if (counter == this.listOfAds.length) {
          counter=0;
        }
        observer.next(this.listOfAds[counter]);
        counter++;
      }, timeInSec * 1000);

      return {
        unsubscribe() {
          clearInterval(Interval);
          // console.log('Unsubscribe');
        },
      }
    });
  }


  // getTimedAds(timeInSec: number) {
  //   // return interval(timeInSec*1000)
  //   return from(this.listOfAds)
  // }
}
