// ProductViewModel.ts
import { makeObservable, observable, action, computed } from 'mobx';
import { fetchProductData, postProductData, setProductDefaultPayload } from './ProductDataProvider';
import ProductModel, { Product } from './ProductModel';

class ProductViewModel {
    public productModel = ProductModel;
  constructor() {
    makeObservable(this, {
      products: computed,
      fetchProducts: action,
      addProduct: action,
    });
  }

  get products(): Product[] {
    return this.productModel.products;
  }

  async fetchProducts(authToken?: string) {
    try {
      const data = await fetchProductData('/products', authToken);
      this.productModel.setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addProduct(product: Product, authToken?: string) {
    try {
      const data = await postProductData('/products', product, authToken);
      // Handle response as needed
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }
}

const productViewModel = new ProductViewModel();
export default productViewModel;
