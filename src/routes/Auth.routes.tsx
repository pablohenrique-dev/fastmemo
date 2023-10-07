import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Index";
import { Register } from "../pages/Register/Index";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/criar-conta" element={<Register />} />
    </Routes>
  );
};
