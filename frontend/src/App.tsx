import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import Register from "./pages/Register";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* PUBLIC ROUTES  */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/"/> : <Register />} 
      />
        {/* PRIVATE ROUTES  */}
      <Route element={
          <ProtectedRoute>
             <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<Sales />} />
      </Route>
    </Routes>
  );
}
