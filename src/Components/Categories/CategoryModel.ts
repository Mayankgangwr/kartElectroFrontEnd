// CategoryModel.ts
import { makeObservable, observable, action } from 'mobx';
import { fetchCategoryData, postCategoryData, setCategoryDefaultPayload } from './CategoryDataProvider';

export interface Category {
  id: number;
  name: string;
  // Add other properties specific to your category
}

class CategoryStore {
  categories: Category[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      setCategories: action,
    });
  }
 public setCategories(categories: any) {
  this.categories= [];
    categories.map((el: string, index: number) => {
      this.categories.push({ id: index + 1, name: el })
    })
  }
}
const CategoryModel = new CategoryStore();
export default CategoryModel;
