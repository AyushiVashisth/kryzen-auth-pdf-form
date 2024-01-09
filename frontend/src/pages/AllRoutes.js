import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginAndSignUp from "../components/LoginAndSignUp";
import FormData from "../components/FormData";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAndSignUp />} />
      <Route path="/authentication" element={<LoginAndSignUp />} />
      <Route path="/form" element={<FormData />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default AllRoutes;
