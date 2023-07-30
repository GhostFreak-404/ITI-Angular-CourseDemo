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

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.ApiLink}/products`);
  }

  getProductsByCatID(catID: string): Observable<IProduct[]> {
    if (catID === 'All') {
      return this.getAllProducts();
    } else {
      return this.httpClient.get<IProduct[]>(
        `${environment.ApiLink}/products?CategoryID=${catID}`
      );
    }
  }
  getProductByID(prodID: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `${environment.ApiLink}/products/${prodID}`
    );
  }

  getAllCateogories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(
      `${environment.ApiLink}/Categories`
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
    }),
  };

  addProduct(prod: IProduct): Observable<IProduct> {
    return this.httpClient
      .post<IProduct>(`${environment.ApiLink}/products`, prod, this.httpOptions)
      .pipe(
        retry(3),
        catchError((err) => {
          return throwError(() => new Error(`Post Error ${err}`));
        })
      );
  }

  deleteProduct(id: number) {
    return this.httpClient
      .delete(`${environment.ApiLink}/products/${id}`, this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(() => new Error(`Post Error ${err}`));
        })
      );
  }

  updateProduct(id: number, product: IProduct) {
    return this.httpClient
      .put(`${environment.ApiLink}/products/${id}`, product, this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(() => new Error(`Post Error ${err}`));
        })
      );
  }
}
