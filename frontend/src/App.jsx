import { useState } from "react";

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./helper/protectedRouter";
import AddProduct from "./Pages/AddProduct";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
      </Routes>
    </>
  );
}

export default App;
