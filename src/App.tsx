import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Assets/Navbar/Nav";
import "react-toastify/dist/ReactToastify.css";
import "./custom.styles.css";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import { PrimeReactProvider } from 'primereact/api';
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}