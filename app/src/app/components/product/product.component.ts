import { Component } from '@angular/core';
import {Product} from '../../modules/product';
import {RouterLink} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product',
  standalone:true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [];
  constructor(private productService: ApiService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
