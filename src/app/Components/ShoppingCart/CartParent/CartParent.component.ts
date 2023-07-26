import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/ICategory';
import { IProduct } from 'src/app/Models/IProduct';
import { ProductsService } from 'src/app/Services/Products.service';
import { ShoppingCartItems } from 'src/app/ViewModels/shoppingCartItems';
import { CartChildComponent } from '../CartChild/CartChild.component';

@Component({
  selector: 'app-CartParent',
  templateUrl: './CartParent.component.html',
  styleUrls: ['./CartParent.component.css'],
})
export class CartParentComponent implements OnInit {
  SelectedCategory: string = 'All';
  catList!: ICategory[];
  productList!: IProduct[];
  cart: ShoppingCartItems[];
  total: number = 0;

  @ViewChild('Selectedquantity') Selectedquantity!: ElementRef;
  @ViewChild('CartChild') CartChild!: CartChildComponent;

  constructor(public productServ: ProductsService) {
    this.cart = [];
  }

  ngOnInit(): void {
    this.productServ
      .getAllProducts()
      .subscribe((products) => (this.productList = products));

    this.productServ
      .getAllCateogories()
      .subscribe((AllCateogories) => (this.catList = AllCateogories));
  }

  add(product: ShoppingCartItems) {
    if (product.Selectedquantity != 0) {
      if (this.cart.length == 0) {
        this.cart.push(product);
      } else {
        this.cart = this.cart.filter(
          (ele) => ele.ProductID != product.ProductID
        );
        this.cart.push(product);
      }
      this.totalPriceOfAll();
    }
  }

  totalPriceOfAll() {
    this.total = 0;
    this.cart.forEach((productItem, index) => {
      const productPrice =
        productItem.QuantityInCart * productItem.Unitprice +
        productItem.QuantityInCart * productItem.Unitprice * 0.14;
      this.total += productPrice;
    });
  }

  change(product: any) {
    console.log(product);
    this.totalPriceOfAll();
  }

  delete(product: ShoppingCartItems) {
    this.cart = this.cart.filter((ele) => ele.ProductID != product.ProductID);

    this.total -=
      product.QuantityInCart * product.Unitprice +
      product.QuantityInCart * product.Unitprice * 0.14;

    // Updating selected Quantity In Cart In productList
    // // // this.productServ.productList[product.ProductID - 1].QuantityInCart -=
    product.Selectedquantity;
  }

  checkOut() {
    this.CartChild.updateValues(this.cart);
    // Trigger the Child component's view update
    this.cart = [];
  }
}
