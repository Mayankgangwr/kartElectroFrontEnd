import React from "react";
import PriceCard from "./PriceCard";
import { Product } from "../../Components/Products/ProductModel";
import cartViewModel from "../../Components/Cart/CartViewModel";
import { CartItem, CartProducts } from "../../Components/Cart/CartModel";
import { useNavigate } from "react-router-dom";
interface CartTotalCardProps {
    products: Product[];
    cartItems: CartItem;
}
const CartTotalCard: React.FC<CartTotalCardProps> = ({ products, cartItems }) => {
    const navigate =  useNavigate();
    return (
        <section className="md:col-span-1 py-7 px-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
            <h1 className="text-xl">Price Details</h1>
            {cartItems.products.map((cartProduct : CartProducts) => {
              const product = products.find(el => el.id === cartProduct.productId);
              return product ? (
                <PriceCard quantity={cartProduct.quantity} product={product} />
              ) : null;
            })}
            <hr />
            <div className="flex justify-between items-center">
                <p className=" text-gray-600">Total</p>
                <p className="text-2xl">₹ {cartViewModel.totalPrice}</p>
            </div>

            <div className="w-full py-2   flex gap-4 items-center">
                <button
                    className="btn-rounded-primary rounded-full flex items-center gap-2 md:text-sm lg:text-base"
                    onClick={() => {
                        //setisOrderPlaced(true);
                        setTimeout(() => {
                            navigate("/checkout", {
                                state: "cart",
                            });
                        }, 100);
                    }}
                >
                    Proceed to Checkout
                </button>
            </div>
        </section>
    );
};

export default CartTotalCard;
