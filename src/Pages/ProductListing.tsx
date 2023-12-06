import { BiFilter } from "react-icons/bi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
import productViewModel from "../Components/Products/ProductViewModel";
import { Product } from "../Components/Products/ProductModel";
import SingleProduct from "../Assets/Products/SingleProduct";
import { observer } from "mobx-react";
import Loader from "../Assets/loader/Loader";
import Footer from "../Assets/footer/Footer";
import SortBy from "../Assets/filters/SortBy";
import Filters from "../Assets/filters/Filters";

const ProductListing: React.FC = () => {
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await productViewModel.fetchProducts();
      setProducts(productViewModel.products);
    };
    fetchData();
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const toggleShowArrow = () => {
      if (window.scrollY > 300) {
        setShowScrollArrow(true);
      } else {
        setShowScrollArrow(false);
      }
    };
    window.addEventListener("scroll", toggleShowArrow);

    return () => {
      window.removeEventListener("scroll", toggleShowArrow);
    };
  }, []);


  const SortByPrice = (value: string) => {
    setSortBy(value);
    value === "low_to_high" && setProducts(products.sort((a, b) => a.price - b.price));
    value === "high_to_low" && setProducts(products.sort((a, b) => b.price - a.price));
    value === "" && setProducts(productViewModel.products);

  }

  return (
    <>
      {productViewModel.products.length === 0 ? (
        <div className="h-[70vh] w-full flex items-center justify-center overflow-hidden ">
          <Loader />
        </div>
      ) : (
        <div>
          <header className="mb-3">
            <img
              src={'../assets/bannerHero.jpg'}
              alt="bannerImg"
              className="rounded-md h-full min-h-[10rem] object-cover"
            />
          </header>
          <section className="py-3 flex flex-col md:flex-row gap-2 justify-between">
            <h1 className="text-2xl font-bold">Electronice Products for You!</h1>
            <div className="flex items-center gap-2">
              <Filters
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
              <label>
                <select
                  name="sortBy"
                  value={sortBy}
                  className="w-max py-1 px-2 rounded-md cursor-pointer shadow-md   hover:shadow-lg "
                  onChange={(e) => SortByPrice(e.target.value)}
                >
                  <option value="" defaultValue="" disabled>
                    Sort By Price
                  </option>
                  <option value="low_to_high" className="">
                    Low to High
                  </option>
                  <option value="high_to_low" className="">
                    High to Low
                  </option>
                </select>
              </label>
              <button
                className={`flex py-1 px-2 rounded-md shadow-md items-center  gap-1 hover:bg-[--primary-text-color] hover:text-white hover:shadow-lg ${isFilterOpen ? "bg-[--primary-text-color] text-white" : ""
                  }`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <BiFilter className="text-lg" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </section>

          {productViewModel.products.length > 0 ? (
            <main className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {productViewModel.products.map((glass: Product) => (
                <SingleProduct key={glass.id} product={glass} />
              ))}
            </main>
          ) : (
            <p className="font-sans text-4xl  font-bold uppercase  tracking-wide text-gray-300 text-center w-full py-32">
              Nothing to Show!
            </p>
          )}
          <button
            className={` fixed bottom-10 bg-gray-800 right-2 p-2 rounded-full text-xl shadow-2xl transition-all delay-100 ease-in-out ${showScrollArrow ? "block" : "hidden"
              }`}
            onClick={scrollToTop}
          >
            <MdKeyboardArrowUp className=" text-white" />
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default observer(ProductListing);
