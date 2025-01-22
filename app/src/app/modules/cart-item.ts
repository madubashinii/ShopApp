import {Product} from './product';

export class CartItem {
  id: bigint;
  productName: string;
  productBrand: string;
  productPrice: number;
  productImg1: string;
  quantity: number;

  constructor(product: Product) {
    this.id = product.id;
    this.productName = product.productName;
    this.productBrand = product.productBrand;
    this.productPrice = product.productPrice;
    this.productImg1 = product.productImg1;

    this.quantity = 1;
  }
}
