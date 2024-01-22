import React from "react";
import AddressCard from "../address/AddressCard";
import PriceDetailsCard from "./PriceDetailsCard";
import authViewModel from "../../Components/Auth/AuthViewModel";
import cartViewModel from "../../Components/Cart/CartViewModel";
import { observer } from "mobx-react";

const OrderSummary: React.FC = observer(() => {
  return (
    <div className="px-7  rounded-md shadow-sm bg-gray-50 flex flex-col gap-2 min-w-[25rem] w-full h-min">
      <h1 className="text-sm font-semibold text-gray-700 ms-4">Address</h1>
      <AddressCard address={authViewModel.profile?.address} showInput={false} />
      <hr />
      <PriceDetailsCard
        totalItems={cartViewModel.totalItems}
        actualPriceOfCart={cartViewModel.totalPrice}
        totalPriceOfCartProducts={cartViewModel.totalPrice}
      />
      <hr />
      <div className="flex justify-between items-center">
        <p className=" text-gray-600">Total</p>
        <p className="text-2xl">₹{cartViewModel.totalPrice}</p>
      </div>
    </div>
  );
});

export default OrderSummary;
