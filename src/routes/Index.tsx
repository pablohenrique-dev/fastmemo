import { Route, Routes } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Home } from "../pages/Home/Index";
import { Stats } from "../pages/Stats/Index";
import { Account } from "../pages/Account/Index";
import { Deck } from "../pages/Card/Index";
import { AddDeck } from "../pages/Deck/AddDeck";
import { UpdateDeck } from "../pages/Deck/UpdateDeck";
import { Login } from "../pages/Login/Index";
import { Register } from "../pages/Register/Index";
import { ProtectedRoute } from "../utils/ProtectedRoute";
import { Navbar } from "../components/Navbar/Index";
import { SplashScreen } from "../components/SplashScreen/Index";

const myRoutes = [
  { element: Home, path: "/" },
  { element: Stats, path: "/estatisticas" },
  { element: Account, path: "/minha-conta" },
  { element: Deck, path: "/cards/*" },
  { element: AddDeck, path: "/adicionar-deck" },
  { element: UpdateDeck, path: "/atualizar-deck" },
];

export const AppRoutes = () => {
  const { logged, user } = useAuthContext();

  return (
    <>
      {logged && (
        <>
          <Navbar />
          <SplashScreen user={user?.name} />
        </>
      )}
      <Routes>
        {myRoutes.map((element) => {
          return (
            <Route
              key={element.path}
              path={element.path}
              element={
                <ProtectedRoute>
                  <element.element />
                </ProtectedRoute>
              }
            />
          );
        })}
        <Route path="/login" element={<Login />} />
        <Route path="/criar-conta" element={<Register />} />
      </Routes>
    </>
  );
};
