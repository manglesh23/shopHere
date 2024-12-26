import { useState } from "react";

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./helper/protectedRouter";
import AddProduct from "./Pages/AddProduct";
import PaymentComponent from "./helper/PaymentComponent";
import { useLocation } from "react-router-dom";
import Cart from "./Pages/Cart";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/payment" element={<PaymentComponent/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </>
  );
}

// const PaymentComponentWrapper = () => {
//   const location = useLocation();
//   const { price, productName, description } = location.state || {};
//   return (
//     <PaymentComponent
//       price={price}
//       productName={productName}
//       description={description}
//     />
//   );
// };

export default App;
