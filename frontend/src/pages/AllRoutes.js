import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginAndSignUp from "../components/LoginAndSignUp";
import FormData from "../components/FormData";
import PrivateRoute from "../Context/PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAndSignUp />} />
      <Route path="/authentication" element={<LoginAndSignUp />} />
      <Route path="/form" element={<PrivateRoute><FormData /></PrivateRoute>} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default AllRoutes;
