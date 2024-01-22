import { CiSearch } from "react-icons/ci";
import { filterBySearch } from "../../utils/filterUtils";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import productViewModel from "../../Components/Products/ProductViewModel";
import CartItemCard from "../Cart/CartItemCard";
import  { Product } from "../../Components/Products/ProductModel";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [showList, setShowList] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (location?.pathname !== "/products") {
      setSearch("");
    }
  }, [location]);
  // useEffect(() => {
  //   setSearching(true);
  //   let id: any;
  //   id = setTimeout(() => {
  //     setFilteredData(filterBySearch(search, productViewModel.products));
  //     setSearching(false);
  //     if (location?.pathname === "/products" && !search) {
  //       applyFilters("searchText", search);
  //     }
  //   }, 500);

  //   return () => {
  //     clearTimeout(id);
  //   };
  // }, [search]);

  const changeHandler = (e: any) => {
    setSearch(e.target.value);
    if (!showList) setShowList(true);
  };
  const submitHandler = (e: any) => {
    e.preventDefault();

    productViewModel.setSearchText(search)
    setShowList(false);
    navigate("/products");
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className={`flex items-center bg-black/[0.075] px-3 ${search && showList ? "rounded-t-md" : "rounded-full"
          } text-sm transition`}
      >
        <input
          className="w-full py-2 px-3 bg-transparent focus:outline-none"
          type="search"
          value={search}
          placeholder="Search Products"
          onChange={changeHandler}
        />
        <CiSearch />
      </form>
      {search && showList && (
        <ul className="absolute bg-amber-50 w-full max-h-72 overflow-auto rounded-b-md z-10">
          {searching ? (
            <li className="h-10 flex items-center justify-center">
              <img src={`./assets/loaderBlack.svg`} alt="Searching..." />
            </li>
          ) : filteredData.length ? (
            filteredData.map((product: Product) => (
              <li key={product.id} className="">
                <CartItemCard
                  product={product}
                  isSearch={true}
                  setSearch={setSearch}
                />
              </li>
            ))
          ) : (
            <li className="h-10 flex items-center justify-center">
              No Item to show
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Search;
