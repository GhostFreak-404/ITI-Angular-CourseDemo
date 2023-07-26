import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/IProduct';
import { ProductsService } from 'src/app/Services/Products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/Models/ICategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-NewProduct',
  templateUrl: './NewProduct.component.html',
  styleUrls: ['./NewProduct.component.css'],
})
export class NewProductComponent implements OnInit, OnDestroy {
  product: IProduct = {} as IProduct;
  AllCat!: ICategory[];
  subs: Subscription[] = [];
  id!: number;
  hasParam: boolean = false;
  constructor(
    private prodServ: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCats();

    let paramSub = this.activatedRoute.paramMap.subscribe((Params) => {
      // Check if params exist
      const hasParams = Params.keys.length > 0;
      if (hasParams) {
        this.id = Number(Params.get('id'));
        this.hasParam = true;
        // Path has params
        this.prodServ
          .getProductByID(this.id)
          .subscribe((product) => (this.product = product));
      } else {
        // Path does not have params
        // console.log('Path does not have params');
      }
    });
    this.subs.push(paramSub);
  }

  getCats() {
    let cat = this.prodServ.getAllCateogories().subscribe((data) => {
      this.AllCat = data;
    });
    this.subs.push(cat);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  add() {
    if (this.hasParam) {
      let sub = this.prodServ.updateProduct(this.id, this.product).subscribe((data) => {
        this.openSnackBar('Product is Updated Successfully', 'OK');
        this.router.navigate(['Orders']);
      });
      this.subs.push(sub);
    } else {
      let sub = this.prodServ.addProduct(this.product).subscribe((data) => {
        this.openSnackBar('Product is Added Successfully', 'OK');
        this.router.navigate(['Orders']);
      });
      this.subs.push(sub);
    }
  }

  ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
