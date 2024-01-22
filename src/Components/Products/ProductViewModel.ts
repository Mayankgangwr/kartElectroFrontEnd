// ProductViewModel.ts
import { makeObservable, action, computed } from 'mobx';
import { fetchProductData, postProductData, getSinglrProduct } from './ProductDataProvider';
import ProductModel, { IFilterData, Product } from './ProductModel';

class ProductViewModel {
  public productModel = ProductModel;
  productViewModel: any;
  constructor() {
    makeObservable(this, {
      product: computed,
      products: computed,
      isFilter: computed,
      setFilterData: action,
      fetchProducts: action,
      addProduct: action,
      getSinglrProduct: action,
    });
  }

  get product(): Product | null {
    return this.productModel.product;
  }

  get products(): Product[] {
    let filteredProducts = this.productModel.products;
    if (this.productModel.filterData?.category) {
      filteredProducts = filteredProducts.filter(product => product.category === this.productModel.filterData?.category);
    }

    // Filter products based on price range
    if (this.productModel.filterData?.priceRange) {
      const [minPrice, maxPrice] = this.productModel.filterData.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    return filteredProducts;
  }

  get isFilter(): boolean {
    if (this.productModel.filterData) {
      return true
    }
    return false;
  }

  async setSearchText(searchText: string){
     this.productModel.searchText = searchText;
  }

  async setFilterData(filterData: IFilterData) {
    this.productModel.setFilterData(filterData)
  }

  async fetchProducts(authToken?: string) {
    try {
      const data = await fetchProductData('/products', authToken);
      this.productModel.setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async getSinglrProduct(Id: number, authToken?: string) {
    try {
      const data = await getSinglrProduct(`/products/${Id}`, authToken);
      this.productModel.setProduct(data);
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
