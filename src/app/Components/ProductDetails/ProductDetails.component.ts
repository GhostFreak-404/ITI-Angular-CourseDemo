import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/IProduct';
import { ProductsService } from 'src/app/Services/Products.service';

@Component({
  selector: 'app-ProductDetails',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productList!: IProduct[];
  prodID: number = 0;
  product!: IProduct;
  // productIndex: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productServ: ProductsService,
    private location: Location  ) {
  }

  ngOnInit() {
    // this.prodID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productServ.getAllProducts().subscribe(
      list => this.productList = list
    )

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.prodID = Number(paramMap.get('id'));
      this.productServ.getProductByID(this.prodID).subscribe(
        product => this.product = product
      );
      // this.productIndex = this.findIndexOfElementByProductId(this.prodID);
    });
  }

  ngOnDestroy(): void {
    this.productServ.getAllProducts().subscribe(
      list => this.productList = list
    ).unsubscribe()

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.prodID = Number(paramMap.get('id'));
      this.productServ.getProductByID(this.prodID).subscribe(
        product => this.product = product
      ).unsubscribe();
    }).unsubscribe();
  }

  findIndexOfElementByProductId(id: number) {
    return this.productList.findIndex((product) => product.id === id);
  }

  goBack() {
    // this.location.back();
    this.router.navigate(['/Orders']);
  }

  prevProduct() {
    // this.productIndex = this.productServ.findIndexOfElementByProductId(this.prodID);
    // this.prodID = this.productServ.productList[ this.productIndex==0 ? this.productServ.productList.length-1 : this.productIndex-1 ].ID;
    this.prodID = this.productList[this.findIndexOfElementByProductId(this.prodID) - 1].id;
    this.router.navigate(['/Product', this.prodID]);
  }

  nextProduct() {
    // this.productIndex = this.productServ.findIndexOfElementByProductId(this.prodID);
    // this.prodID = this.productServ.productList[ this.productIndex==this.productServ.productList.length-1 ? 0 : this.productIndex+1 ].ID;
    this.prodID = this.productList[this.findIndexOfElementByProductId(this.prodID) + 1].id;
    this.router.navigate(['/Product', this.prodID]);
  }
}
