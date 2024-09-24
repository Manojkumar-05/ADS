import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-green-100">
          <Navbar />
          <main className="flex-grow pt-16"> {/* Add padding-top here */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <ConditionalFooter />
        </div>
        <ToastContainer />
      </Router>
    </CartProvider>
  );
}

function ConditionalFooter() {
  const location = useLocation();
  const noFooterPaths = ["/checkout", "/product/:id", "/cart"];

  // Check if the current path matches any of the noFooterPaths
  const shouldHideFooter = noFooterPaths.some((path) =>
    location.pathname.startsWith(path.replace(":id", ""))
  );

  return !shouldHideFooter && <Footer />;
}

export default App;
