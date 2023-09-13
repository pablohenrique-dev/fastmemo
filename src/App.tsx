import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Index";
import { Home } from "./pages/Home/Index";
import { Stats } from "./pages/Stats/Index";
import { Login } from "./pages/Login/Index";
import { Register } from "./pages/Register/Index";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useAuthContext } from "./contexts/AuthContext";

function App() {
  const { pathname } = useLocation();
  const { logged } = useAuthContext();

  return (
    <section className="grid grid-cols-[250px_auto]">
      {pathname !== "/criar-conta" && pathname !== "/login" && logged && (
        <Navbar />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estatisticas"
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-conta" element={<Register />} />
      </Routes>
    </section>
  );
}

export default App;
