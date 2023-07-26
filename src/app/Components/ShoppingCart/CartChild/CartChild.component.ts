import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { IProduct } from 'src/app/Models/IProduct';
import { ShoppingCartItems } from 'src/app/ViewModels/shoppingCartItems';
import { ChangeDetectorRef } from '@angular/core';
import { ProductsService } from 'src/app/Services/Products.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-CartChild',
  templateUrl: './CartChild.component.html',
  styleUrls: ['./CartChild.component.css'],
})
export class CartChildComponent implements OnInit, OnChanges, OnDestroy {
  // properties
  productList!: IProduct[];
  cartItem: ShoppingCartItems;
  @Input() CategoryID!: string;
  @Output() addToCart: EventEmitter<ShoppingCartItems>;
  @ViewChild('inputValue') inputValue!: ElementRef;

  subs: Subscription[] = [];
  SelectedProduct: IProduct = {
    id: 0,
    Name: '',
    Price: 0,
    Quantity: 0,
    ImgURL: '',
    CategoryID: 0,
    QuantityInCart: 0
  };

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private productServ: ProductsService,
    private router:Router,
    private _snackBar: MatSnackBar
  ) {
    // Declerations
    this.addToCart = new EventEmitter<ShoppingCartItems>();
    this.cartItem = {
      ProductID: 0,
      ProductName: '',
      Unitprice: 0,
      Selectedquantity: 0,
      QuantityInCart: 0,
    };
    }

  ngOnInit() {
    this.CategoryID = 'All';
    this.productServ.getAllProducts().subscribe(
      products => this.productList = products
    )

  }
  ngOnChanges() {
    this.productServ.getProductsByCatID(this.CategoryID).subscribe(
      products => this.productList = products
    )
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  buy(product: IProduct, inputValue: string) {
    // Update CartItem
    this.cartItem = {
      ProductID: product.id,
      ProductName: product.Name,
      Unitprice: product.Price,
      Selectedquantity: +inputValue,
      QuantityInCart: +inputValue,
    };
    // Send it to the Event on the ParentCart Component
    this.addToCart.emit(this.cartItem);

    // Updating selected Quantity In Cart In productList
    this.productList[product.id - 1].QuantityInCart += +inputValue;
  }

  updateValues(cart: ShoppingCartItems[]) {
    cart.forEach((cartItem) => {
      this.productList[cartItem.ProductID - 1].Quantity -=
        cartItem.QuantityInCart;
      this.subs.push(this.productServ.updateProduct(cartItem.ProductID, this.productList[cartItem.ProductID - 1]).subscribe())
    });
  }

  navUrl(id: number) {
    // this.router.navigateByUrl(`/Product/${id}`)
    this.router.navigate(['/Product', id]).then(
      () => console.log('Nav Is Complete', `ID is ${id}`)
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }


  modelRun(product: IProduct) {
    this.SelectedProduct = product;
  }

  del() {
    let del = this.productServ.deleteProduct(this.SelectedProduct.id).subscribe((data) => console.log(data));
    this.subs.push(del);
    this.productList = this.productList.filter(product => product.id !== this.SelectedProduct.id);
    this.openSnackBar(`Product Deleted` , 'ok');
  }
}
