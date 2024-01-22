import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";
import cartViewModel from "../Components/Cart/CartViewModel";
import productViewModel from "../Components/Products/ProductViewModel";
import CartItemCard from "../Assets/Cart/CartItemCard";
import CartTotalCard from "../Assets/Cart/CartTotalCard";
import Footer from "../Assets/footer/Footer";
const Cart: React.FC = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    productViewModel.fetchProducts();
    cartViewModel.getCartItems();
  }, []); 
  return (
    <div className="py-2 " style={{ paddingTop: "80px" }}>
      {cartViewModel.allCartItems && (
        <h1 className="text-2xl font-bold p-3 ">Bag({cartViewModel.allCartItems.products.length})</h1>
      )}
      {cartViewModel.allCartItems && cartViewModel.allCartItems?.products.length > 0 ? (
        <div className="md:grid md:grid-cols-3 gap-5">
          <main className="md:col-span-2">
            {cartViewModel.allCartItems.products.map((cartProduct) => {
              const product = productViewModel.products.find(el => el.id === cartProduct.productId);
              return product ? (
                <CartItemCard product={product} quantity={cartProduct.quantity} />
              ) : null;
            })}
          </main>
          
          <CartTotalCard products={productViewModel.products} cartItems={cartViewModel.allCartItems} />
        </div>
      ) : (
        <div className="h-[60vh] w-full flex flex-col items-center justify-center  gap-3 ">
          <img
            src={`./assets/empty-shopping-bag.png`}
            alt="empty bag"
            className="h-36 -rotate-12 mt-5 drop-shadow-lg"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold">Hey, it feels so light!</h2>
            <p className="text-sm text-gray-400">
              There's nothing in your bag. Let's add some items.
            </p>
          </div>
          <button
            className="btn-rounded-secondary text-sm mt-5"
            onClick={() => navigate("/products")}
          >
            Explore
          </button>
        </div>
      )}
    <Footer />
    </div>
  );
});

export default Cart;
