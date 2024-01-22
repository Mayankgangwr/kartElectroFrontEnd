// ProductModel.ts
import { makeObservable, observable, action } from 'mobx';
import { fetchProductData, postProductData, setProductDefaultPayload } from './ProductDataProvider';

export interface IFilterData {
  priceRange: any;
  category: string | null;
}
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
  product: Product | null = null;
  products: Product[] = [];
  filterData: IFilterData | null = null
  searchText: string | null = null;

  constructor() {
    makeObservable(this, {
      products: observable,
      product: observable,
      filterData: observable,
      setProducts: action,
    });
  }

  setProduct(product: Product) {
    this.product = product;
  }
  setProducts(products: Product[]) {
    this.products = products;
  }
  setFilterData(filterData: IFilterData) {
    this.filterData = filterData;
  }
}

const ProductModel = new ProductStore();
export default ProductModel;
