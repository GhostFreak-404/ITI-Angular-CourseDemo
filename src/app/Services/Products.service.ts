import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICategory } from '../Models/ICategory';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // productList: IProduct[];
  constructor(private httpClient: HttpClient) {
    // this.productList = [
    //   {
    //     ID: 1,
    //     Name: 'Phones',
    //     Quantity: 3,
    //     Price: 129.5,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 3,
    //     QuantityInCart: 0,
    //   },
    //   {
    //     ID: 2,
    //     Name: 'Laptops',
    //     Quantity: 4,
    //     Price: 500,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 1,
    //     QuantityInCart: 0,
    //   },
    //   {
    //     ID: 3,
    //     Name: 'Iphone',
    //     Quantity: 1,
    //     Price: 100,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 3,
    //     QuantityInCart: 0,
    //   },
    //   {
    //     ID: 4,
    //     Name: 'IPad',
    //     Quantity: 3,
    //     Price: 150,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 2,
    //     QuantityInCart: 0,
    //   },
    //   {
    //     ID: 5,
    //     Name: 'GPU',
    //     Quantity: 0,
    //     Price: 199,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 4,
    //     QuantityInCart: 0,
    //   },
    //   {
    //     ID: 6,
    //     Name: 'CPU',
    //     Quantity: 8,
    //     Price: 90,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 4,
    //     QuantityInCart: 0,
    //   },
    //   {
    //     ID: 7,
    //     Name: 'Rams',
    //     Quantity: 1,
    //     Price: 50,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 4,
    //     QuantityInCart: 0,
    //   },
    //   {
    //     ID: 8,
    //     Name: 'Cooling Systems',
    //     Quantity: 4,
    //     Price: 40,
    //     Img: 'https://placehold.co/200x100',
    //     CategoryID: 5,
    //     QuantityInCart: 0,
    //   },
    // ];
  }

  // getProductsByCatID(catID: string): IProduct[] {
  //   if (catID === 'All') {
  //     return this.productList;
  //   } else {
  //     return this.productList.filter((ele) => ele.CategoryID == +catID);
  //   }
  // }

  // getProductByID(prodID: number): IProduct | undefined {
  //   return this.productList.find((ele) => ele.ID == +prodID);
  // }

  // findIndexOfElementByProductId(id: number) {
  //   return this.productList.findIndex((product) => product.ID === id);
  // }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.LiveGetApi}/products`);
  }

  getProductsByCatID(catID: string): Observable<IProduct[]> {
    if (catID === 'All') {
      return this.getAllProducts();
    } else {
      return this.httpClient.get<IProduct[]>(
        `${environment.LiveGetApi}/products?CategoryID=${catID}`
      );
    }
  }
  getProductByID(prodID: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.LiveGetApi}/products/${prodID}`);
  }

  getAllCateogories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.LiveGetApi}/Categories`)
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
    })
  }

  addProduct(prod: IProduct): Observable<IProduct> {
    return this.httpClient.post <IProduct>(`${environment.ApiLink}/products`, prod, this.httpOptions)
    .pipe(
      retry(3),
      catchError((err) => {
        return throwError(() => new Error(`Post Error ${err}`));
      })
    );
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${environment.ApiLink}/products/${id}`, this.httpOptions)
    .pipe(
      catchError((err) => {
        return throwError(() => new Error(`Post Error ${err}`));
      })
    );
  }

  updateProduct(id: number, product: IProduct) {
    return this.httpClient.put(`${environment.ApiLink}/products/${id}`, product, this.httpOptions).pipe(
      catchError((err) => {
        return throwError(() => new Error(`Post Error ${err}`));
      })
    );
  }
}
