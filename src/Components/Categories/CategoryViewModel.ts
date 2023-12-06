// CategoryViewModel.ts
import { makeObservable, observable, action, computed } from 'mobx';
import { fetchCategoryData, postCategoryData, setCategoryDefaultPayload } from './CategoryDataProvider';
import CategoryModel, { Category } from './CategoryModel';

class CategoryViewModel {
  public categoryModel = CategoryModel;

  constructor() {
    makeObservable(this, {
      categories: computed,
      fetchCategories: action,
      addCategory: action,
    });
  }

  get categories(): Category[] {
    return this.categoryModel.categories;
  }

  async fetchCategories(authToken?: string) {
    try {
      const data = await fetchCategoryData('/products/categories', authToken);
      this.categoryModel.setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async addCategory(category: Category, authToken?: string) {
    try {
      const data = await postCategoryData('/categories', category, authToken);
      // Handle response as needed
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }
}

const categoryViewModel = new CategoryViewModel();
export default categoryViewModel;
