import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Product } from "../../Components/Products/ProductModel";
interface CartItemCardProps {
  product: Product;
  quantity?: number;
  setSearch?: any;
  isSearch?: boolean;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ product, quantity, isSearch, setSearch }) => {
  const navigate = useNavigate();
  const updateHandler = (type: string) => {
    if (type === "increment" && quantity) {
      //updateProductQtyInCart(product.id, type);
    } else if (quantity && quantity > 1) {
      // updateProductQtyInCart(product.id, type);
    } else {
      // deleteProductFromCart(product.id);
    }
  };
  const inWish = false;
  return (
    <div
      className={`m-auto flex flex-col gap-2  p-4 rounded-sm shadow-sm bg-white/[0.6] mb-2 max-w-xl`}
      onClick={() => {
        if (isSearch) {
          setSearch("");
          navigate(`product/${product.id}`);
        }
      }}
    >
      <div className="flex  items-center flex-wrap gap-2 w-full">
        <div className="flex flex-wrap xs:flex-nowrap justify-center xs:justify-start flex-1 items-center gap-5">
          <div
            className={` bg-black/[0.075] h-28 w-28 rounded-md flex items-center`}
          >
            <img src={product.image} alt="" className="object-fit w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl py-3 font-semibold">{product.title.split(' ').slice(0, 3).join(' ')}</h2>

            {(
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <span className="text-gray-700">Quantity: </span>
                  <button
                    className="bg-[--primary-text-color] p-1 text-gray-100 rounded-md  text-xs disabled:cursor-not-allowed"
                    // disabled={disableCart}
                    onClick={() => updateHandler("decrement")}
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="h-full w-10 bg-black/[0.075]  rounded-sm flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    className="bg-[--primary-text-color] p-1 text-gray-100 rounded-md text-xs disabled:cursor-not-allowed"
                    // disabled={disableCart}
                    onClick={() => updateHandler("increment")}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex gap-1 sm:gap-3  ">
                  <button
                    className="btn-rounded-secondary  text-xs sm:text-sm mt-2 max-w-xs disabled:cursor-not-allowed"
                  // disabled={disableCart}
                  // onClick={() => deleteProductFromCart(product._id)}
                  >
                    Remove from Bag
                  </button>
                  <button
                    className="disabled:cursor-not-allowed"
                  // disabled={disableWish}
                  // onClick={() => {
                  //   if (inWish) {
                  //     deleteProductFromWishlist(product._id);
                  //   } else {
                  //     addProductToWishlist(product);
                  //   }
                  // }}
                  >
                    {inWish ? (
                      <BsFillBookmarkHeartFill className="text-xl text-rose-600 hover:shadow-md transition" />
                    ) : (
                      <BsBookmarkHeart className="text-xl hover:text-rose-600 hover:shadow-md transition" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span>₹{product.price}</span>
          <span className="text-xs line-through text-gray-600">
            ₹ {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
