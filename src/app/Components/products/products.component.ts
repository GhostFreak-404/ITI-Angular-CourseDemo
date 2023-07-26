import { Component } from '@angular/core';
import { ICategory } from 'src/app/Models/ICategory';
import { IProduct } from 'src/app/Models/IProduct';
import { DiscountOffers } from 'src/app/ViewModels/DiscountOffers.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  discountAmount: DiscountOffers = DiscountOffers.FifteenPercent;
  productList: IProduct[];
  // catList: ICategory[];
  isPurchased = false;
  ClientName: String = '';
  review: string = '';
  classes = 'bg-baige textblue';
  Isclasses = false;
  date: Date;
  catID: Number;
  idNumber: string;
  creditNum: string;
  constructor() {
    this.catID = 1;
    // this.catList = [
    //   { id: 1, name: 'Laptops' },
    //   { id: 2, name: 'Tablets' },
    //   { id: 3, name: 'SmartPhones' },
    //   { id: 4, name: 'PC' },
    //   { id: 5, name: 'Accessory' },
    // ];
    this.date = new Date();
    this.productList = [
      {
        id: 1,
        Name: 'Phones',
        Quantity: 1,
        Price: 129.5,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 3,
        QuantityInCart: 0,
      },
      {
        id: 2,
        Name: 'Laptops',
        Quantity: 4,
        Price: 50000000,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 1,
        QuantityInCart: 0,
      },
      {
        id: 3,
        Name: 'Iphone',
        Quantity: 5,
        Price: 10000000000,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 3,
        QuantityInCart: 0,
      },
      {
        id: 4,
        Name: 'IPad',
        Quantity: 1,
        Price: 90000000,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 2,
        QuantityInCart: 0,
      },
      {
        id: 5,
        Name: 'GPU',
        Quantity: 2,
        Price: 19900.99,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 4,
        QuantityInCart: 0,
      },
      {
        id: 6,
        Name: 'CPU',
        Quantity: 1,
        Price: 50099.99,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 4,
        QuantityInCart: 0,
      },
      {
        id: 7,
        Name: 'Rams',
        Quantity: 5,
        Price: 500,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 4,
        QuantityInCart: 0,
      },
      {
        id: 8,
        Name: 'Cooling Systems',
        Quantity: 0,
        Price: 9000.99,
        ImgURL: 'https://placehold.co/200x100',
        CategoryID: 5,
        QuantityInCart: 0,
      },
    ];

    this.idNumber = '32009011509345';
    this.creditNum = '448985762164020550';
  }

  display(text: string) {
    this.review = text;
  }

  trackByFunc(index: number, product: IProduct) {
    return product.id;
  }

  resetFilter() {
    let trs = document.querySelectorAll('tr');
    trs.forEach((ele) => {
      ele.removeAttribute('hidden');
      this.catID = 0;
    });
  }
  rebuildTable() {
    this.isPurchased = true;
    setTimeout(() => {
      this.isPurchased = false;
    }, 100);
  }
}
