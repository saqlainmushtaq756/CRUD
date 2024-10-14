import React from "react";
import Home from "./CRUD/Home";
import SignUp from "./CRUD/SignUp";
import { Route, Routes } from "react-router-dom";
import SignIn from "./CRUD/SignIn";
import EditSignUp from "./CRUD/EditSignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/editsignup/:id" element={<EditSignUp />} />
    </Routes>
  );
}
