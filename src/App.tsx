import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Assets/Navbar/Nav";
import "react-toastify/dist/ReactToastify.css";
import "./custom.styles.css";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProductListing";
import LoginComponent from "./Components/Auth/LoginComponent";
import { useEffect } from "react";
import Cookies from "js-cookie";
import authModel from "./Components/Auth/AuthModel";
import ProtectedRoute from "./Assets/Routes/PrivateRoute";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Signup from "./Components/Auth/Signup";
import Profile from "./Components/Auth/Profile";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Graphql from "./Graphql";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
export default function App() {
  useEffect(() => {
    if (Cookies.get('authToken')) {
      authModel.token = Cookies.get('authToken');
    }
  }, []);

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // Your GraphQL server URL
    cache: new InMemoryCache(),
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={
              <ProtectedRoute user={authModel.token}>
                <Cart />
              </ProtectedRoute>} />
            <Route path="/wishlist" element={
              <ProtectedRoute user={authModel.token}>
                <Wishlist />
              </ProtectedRoute>} />
            <Route path="/profile" element={
              <ProtectedRoute user={authModel.token}>
                <Profile />
              </ProtectedRoute>} />
            <Route path="/checkout" element={
              <ProtectedRoute user={authModel.token}>
                <Checkout />
              </ProtectedRoute>} />
            <Route path="/orders" element={
              <ProtectedRoute user={authModel.token}>
                <Orders />
              </ProtectedRoute>} />
          </Route>
          <Route path="/graph" element={<ApolloProvider client={client}>
            <Graphql />
          </ApolloProvider>} />
        </Routes>
      </BrowserRouter >
    </>
  );
}