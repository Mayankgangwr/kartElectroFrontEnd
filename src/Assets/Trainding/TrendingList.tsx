import { observer } from "mobx-react";
import { Product } from "../../Components/Products/ProductModel";
import TrendingCard from "./TrendingCard";
interface TrendingListProps {
  products: Product[];
}
const TrendingList: React.FC<TrendingListProps> = ({products}) => {
  return (
    <section className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-4  py-4 mt-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl  break-words flex items-center ">
        Trending Products
      </h1>
      {products.map((product: Product) => (
        <TrendingCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default observer(TrendingList);
