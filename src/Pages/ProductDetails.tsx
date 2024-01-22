import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
//import { StarRating } from "../components";
import { notify } from "../utils/utils";
import authViewModel from "../Components/Auth/AuthViewModel";
import productViewModel from "../Components/Products/ProductViewModel";
import { observer } from "mobx-react";
import Footer from "../Assets/footer/Footer";
interface ICart {
  Id: number;
  Qty: number;
}
const ProductDetails: React.FC = () => {
  const { product } = productViewModel;
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  useEffect(() => {
    productViewModel.fetchProducts();
  }, []);
  const { token } = authViewModel;
  const [carts, setCarts] = useState<ICart[]>([{ Id: 1, Qty: 4 }, { Id: 2, Qty: 5 }, { Id: 3, Qty: 3 }]);
  const [wish, setWish] = useState<ICart[]>([{ Id: 1, Qty: 4 }, { Id: 2, Qty: 5 }, { Id: 3, Qty: 3 }]);
  const addProductToWishlist = (productId: any) => {
    const newItem = { Id: productId, Qty: 1 };
    setWish([...wish, newItem]);
  }
  const deleteProductFromWishlist = (productId: any) => {
    setWish(wish.filter(item => item.Id !== productId));
  }

  const addProductToCart = (productId: any) => {
    const newItem = { Id: productId, Qty: 1 };
    setCarts([...carts, newItem]);
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await productViewModel.getSinglrProduct(Number(productId));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {
        productViewModel.product && <div style={{ paddingTop: "80px" }} className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
          <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10 ">
            <section className="relative p-7 bg-black/[0.075]  flex items-center justify-center rounded-lg">
              <img
                src={product?.image}
                alt=""
                className="w-full object-contain max-w-xs"
              />
            </section>

            <section className="p-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5">
              <section className="flex flex-col gap-3 sm:gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className=" text-2xl sm:text-4xl font-bold">{product?.title}</h1>
                  <p className=" text-gray-600 text-sm sm:text-base">
                    {product?.description}
                  </p>
                  <div className="flex items-center gap-1">
                    {/* <StarRating /> */}

                    <span className="text-xs text-gray-400">
                      ({product?.rating.count}) Rating
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2  ">
                  <h2 className="  text-lg font-semibold">About Product</h2>
                  <ul className="flex gap-5">
                    <div>
                      <li>
                        <span className="text-gray-500 text-sm">Brand: </span>
                        {product?.rating.rate}
                      </li>
                      <li>
                        <span className="text-gray-500 text-sm">Category: </span>
                        {product?.category}
                      </li>
                    </div>
                    <div>
                      <li>
                        <span className="text-gray-500 text-sm">Gender: </span>
                        {product?.category}
                      </li>
                      <li>
                        <span className="text-gray-500 text-sm">Heavy: </span>
                        {product?.category}
                      </li>
                    </div>
                  </ul>
                </div>

                <div className="flex gap-2 items-center pb-10 sm:pb-0">
                  Price:
                  <span className="ms-1 text-xl sm:text-2xl text-amber-600">
                    ₹{product?.price}
                  </span>
                  <span className="text-sm text-gray-600 line-through">
                    ₹{product?.price}
                  </span>
                </div>


              </section>
              <div className={`w-full flex items-center justify-center gap-3 sm:gap-0 sm:justify-between`}>
                <button
                  className="btn-rounded-secondary flex items-center gap-1 text-sm disabled:cursor-not-allowed"
                  disabled={product && carts.find((item: ICart) => item.Id === product!.id) ? true : false}
                  onClick={() => {
                    if (!token) {
                      navigate("/login", { state: { from: location.pathname } });
                      notify("warn", "Please Login to continue");
                    } else {
                      if (product && carts.find((item: ICart) => item.Id === product!.id)) {
                        navigate("/cart");
                      } else {
                        addProductToCart(product?.id);
                      }
                    }
                  }}
                >
                  <HiOutlineShoppingBag />{" "}
                  {product && carts.find((item: ICart) => item.Id === product!.id) ? "Go to Bag" : "Add to Bag"}
                </button>

                <button
                  className="btn-rounded-primary rounded-full flex items-center gap-1 text-sm disabled:cursor-not-allowed"
                  disabled={false}
                  onClick={() => {
                    if (!token) {
                      navigate("/login", { state: { from: location.pathname } });
                      notify("warn", "Please Login to continue");
                    } else {
                      if (product && wish.find((item: ICart) => item.Id === product!.id)) {
                        deleteProductFromWishlist(product!.id);
                      } else {
                        addProductToWishlist(product?.id);
                      }
                    }
                  }}
                >
                  {product && wish.find((item: ICart) => item.Id === product!.id) ? (
                    <>
                      <BsFillBookmarkHeartFill />
                      <span>Remove from Wishlist</span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <BsBookmarkHeart /> <span>Wishlist Item</span>
                    </>
                  )}{" "}
                </button>
              </div>
            </section>
          </main>
        </div>
      }
      <Footer />
    </>
  );
};

export default observer(ProductDetails);
