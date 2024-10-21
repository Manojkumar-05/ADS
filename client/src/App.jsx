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
import AuthPage from "./pages/AuthPage";
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
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
            </Routes>
          </main>
          <ConditionalFooter />
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </CartProvider>
  );
}

function ConditionalFooter() {
  const location = useLocation();
  const noFooterPaths = ["/checkout", "/product/:id", "/cart", "/login", "/signup"];

  const shouldHideFooter = noFooterPaths.some((path) =>
    location.pathname.startsWith(path.replace(":id", ""))
  );

  return !shouldHideFooter && <Footer />;
}

export default App;
