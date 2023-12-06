import React from "react";
import { Category } from "../../Components/Categories/CategoryModel";
import { observer } from "mobx-react";
interface CategoryCardProps {
  key: number;
  category: Category;
}

const CategoryCard : React.FC<CategoryCardProps> = ({ category }) => {
  // const navigate = useNavigate();
  // const clickHandler = () => {
  //   applyFilters("categories", [category.name]);
  //   navigate("/products", { state: { from: "category" } });
  // };
  return (
    <section
      className=" flex flex-col items-center rounded-xl  bg-black/[.06] cursor-pointer gap-3 relative overflow-hidden  categoryContainer"
      // onClick={clickHandler}
    >
      <img
        src={'https://eyesome.netlify.app/static/media/sportsmod1.79195fd1fb60315f1319.jpg'}
        alt={category.name}
        className="rounded-xl h-full w-full object-cover transition-all delay-75 ease-out"
      />
      <div
        className="
             flex flex-col w-full h-full justify-center items-center
            transition-all delay-75 absolute left-0 right-0 bottom-0 top-0 bg-black/[0.3] rounded-xl"
      >
        <h1 className="text-4xl xs:text-6xl sm:text-8xl lg:text-6xl font-extrabold capitalize text-[--theme-color] shadow-sm p-3 break-all">
          {category.name}
        </h1>
      </div>
    </section>
  );
};

export default observer(CategoryCard);
