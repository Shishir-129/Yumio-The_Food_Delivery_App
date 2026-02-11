/* Main application component that sets up routing and structure for the Yumio app */

import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          {/* When we type '/' it will goto Home page*/}
          <Route path="/" element={<Home />} />
          {/* When we type '/cart' it will goto Cart page*/}
          <Route path="/cart" element={<Cart />} />
          {/* When we type '/order' it will goto PlaceOrder page*/}
          <Route path="/order" element={<PlaceOrder />} />
          {/* When we type '/verify' it will goto Verify page*/}
          <Route path="/verify" element={<Verify/>} />
          {/* When we type '/myorders' it will goto MyOrders page*/}
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
};

export default App;
