import { AiOutlineClose } from "react-icons/ai";

import { Slider, SliderChangeEvent } from 'primereact/slider';
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useEffect, useState } from "react";
import categoryViewModel from "../../Components/Categories/CategoryViewModel";

const FilterHeading = ({ text }: any) => <h2 className="text-xl mb-4">{text}</h2>;
const Filters = ({ isFilterOpen, setIsFilterOpen }: any) => {
  useEffect(() => {
    categoryViewModel.fetchCategories();
  }, []);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputRange, setInputRange] = useState<number| [number, number]>(100);

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _ingredients = [...ingredients];

    if (e.checked)
      _ingredients.push(e.value.name);
    else
      _ingredients.splice(_ingredients.indexOf(e.value.name), 1);

    setIngredients(_ingredients);
  }


  return (
    <aside
      className={`filtersContainer fixed  top-0 h-screen z-10 flex flex-col p-3 gap-3 overflow-auto
    transition-all ease-in-out duration-300  ${isFilterOpen ? "left-0 " : "-left-96"
        }
    `}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Filter Products</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        />
      </div>
      <button
        className="py-0.5 px-2 w-16 text-center bg-black/[0.2]  text-sm font-semibold shadow-sm rounded-md hover:bg-gray-800 hover:text-white transition-colors "
      // onClick={clearFilters}
      >
        Clear
      </button>
      <section className="py-3">
        <FilterHeading text="Gender" />
        {/* <div className="grid grid-rows-2 grid-cols-2 gap-2">
          {gendersList.map((data, index) => (
            <InputRadioType2 data={data} key={index} />
          ))}
        </div> */}
      </section>
      <section className="py-3">
        <FilterHeading text="Price Range" />
        <Slider value={inputRange} onChange={(e: SliderChangeEvent) => setInputRange(e.value)} className="w-14rem" step={20} />
      </section>
      <section className="py-3">
        <FilterHeading text="Categories" />
        <div className="flex flex-col gap-2">
          {categoryViewModel.categories.map((data, index) => (
            <div className="flex align-items-center">
              <Checkbox inputId="ingredient1" name="pizza" value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes(data.name)} />
              <label htmlFor="ingredient1" className="ml-2">{data.name}</label>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Filters;
