import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Index";
import { Home } from "./pages/Home/Index";
import { Stats } from "./pages/Stats/Index";
import { Login } from "./pages/Login/Index";
import { Register } from "./pages/Register/Index";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useAuthContext } from "./contexts/AuthContext";
import { SplashScreen } from "./components/SplashScreen/Index";
import { Account } from "./pages/Account/Index";
import { Deck } from "./pages/Card/Index";
import { AddDeck } from "./pages/Deck/AddDeck";
import { UpdateDeck } from "./pages/Deck/UpdateDeck";

function App() {
  const { pathname } = useLocation();
  const { logged, user } = useAuthContext();

  return (
    <section className="grid grid-cols-[200px_auto]  md:grid-cols-[250px_auto]">
      {pathname !== "/criar-conta" && pathname !== "/login" && logged && (
        <Navbar />
      )}
      {pathname !== "/criar-conta" && logged && (
        <SplashScreen user={user?.name} />
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
        <Route
          path="/minha-conta"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="cards/*"
          element={
            <ProtectedRoute>
              <Deck />
            </ProtectedRoute>
          }
        />
        <Route
          path="adicionar-deck"
          element={
            <ProtectedRoute>
              <AddDeck />
            </ProtectedRoute>
          }
        />
        <Route
          path="atualizar-deck"
          element={
            <ProtectedRoute>
              <UpdateDeck />
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
