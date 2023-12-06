// ProductModel.ts
import { makeObservable, observable, action } from 'mobx';
import { fetchProductData, postProductData, setProductDefaultPayload } from './ProductDataProvider';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

class ProductStore {
  products: Product[] = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      setProducts: action,
    });
  }

  setProducts(products: Product[]) {
    this.products = products;
  }
}

const ProductModel = new ProductStore();
export default ProductModel;
