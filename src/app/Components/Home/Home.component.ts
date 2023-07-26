import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { PromotionAdsService } from 'src/app/Services/promotion-ads.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscribes: Subscription[] = [];
  ad: string = '';

  constructor(private promotionsAds: PromotionAdsService) {}

  ngOnInit() {
    // let sub = this.promotionsAds.getTimedAds(2).subscribe({
    //   next: (data) => console.log(data),
    //   error: (err) => console.log(err),
    //   complete: () => console.log('ads are completed'),
    // });
    let sub = this.promotionsAds.getTimedAds(2).pipe(
      map((ele, i) => `${ele}`)
    ).subscribe({
      next: (data) => this.ad = data,
      error: (err) => console.log(err),
      complete: () => console.log('ads are completed'),
    });
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscribes) {
      sub.unsubscribe();
    }
  }
}
