import { observer } from "mobx-react";
import { Category } from "../../Components/Categories/CategoryModel";
import CategoryCard from "./CategoryCard";

interface CategoryListProps {
  catRef: any;
  categories: Category[];
}
const CategoryList : React.FC<CategoryListProps> = ({ catRef,  categories}) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl  break-words text-center mt-10">
        Categories
      </h1>
      <section
        className="grid  grid-cols-1  md:grid-cols-3    gap-4  py-4 mt-1"
        ref={catRef}
      >
        {categories.map((categoryItem: Category) => (
          <CategoryCard key={categoryItem.id} category={categoryItem} />
        ))}
      </section>
    </>
  );
};

export default observer(CategoryList);
