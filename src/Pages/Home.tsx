import { useEffect, useRef } from "react";
import Banner from "../Assets/banner/Banner";
import productViewModel from '../Components/Products/ProductViewModel';
import TrendingList from "../Assets/Trainding/TrendingList";
import categoryViewModel from "../Components/Categories/CategoryViewModel";
import CategoryList from "../Assets/Categories/CategoryList";
import Footer from "../Assets/footer/Footer";
import { observer } from "mobx-react";
const Home: React.FC =() => {
    const catRef = useRef(null);
    useEffect(() => {
        productViewModel.fetchProducts();
        categoryViewModel.fetchCategories();
    }, []);
    return (
        <>
            <div style={{ paddingTop: "80px" }}>
                <Banner catRef={catRef} />
                {productViewModel.products.length > 0 && <TrendingList products={productViewModel.products} />}
                {categoryViewModel.categories.length > 0 && <CategoryList catRef={catRef} categories={categoryViewModel.categories} />}
                <Footer />
            </div >
        </>
    );
};
export default observer(Home);
