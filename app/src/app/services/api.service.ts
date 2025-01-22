import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/product/getAll`);
  }

  getProductByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/category/${categoryId}`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/product/getProduct/${id}`);
  }


  //
  // searchProduct(query:string){
  //   return this.http.get<Product[]>(this.apiUrl + `product/search?query=${query}`)
  // }


  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/viewAll`);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/featured`);
  }

}
