import React from "react";
import { Product } from "../../Components/Products/ProductModel";
interface PriceCardProps {
  product: Product;
  quantity: number;
}
const PriceCard: React.FC<PriceCardProps> = ({ product, quantity }: any) => {
  return (
    <div key={product._id} className=" flex  justify-between  ">
      <p className=" text-gray-600 flex-1">
        {product.title.split(' ').slice(0, 3).join(' ')} ({quantity})item
      </p>

      <p className="text-lg">₹ {quantity * product.price}</p>
    </div>
  );
};

export default PriceCard;
