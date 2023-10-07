import { Route, Routes } from "react-router-dom";
import { UpdateDeck } from "../pages/Deck/UpdateDeck";
import { AddDeck } from "../pages/Deck/AddDeck";
import { Deck } from "../pages/Card/Index";
import { Account } from "../pages/Account/Index";
import { Stats } from "../pages/Stats/Index";
import { Home } from "../pages/Home/Index";
import { SplashScreen } from "../components/SplashScreen/Index";
import { Navbar } from "../components/Navbar/Index";
import { User } from "../@types/global";

interface AppRoutesProps {
  user: User | null;
}

export const AppRoutes = ({ user }: AppRoutesProps) => {
  return (
    <>
      <Navbar />
      <SplashScreen user={user?.name} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estatisticas" element={<Stats />} />
        <Route path="/minha-conta" element={<Account />} />
        <Route path="cards/*" element={<Deck />} />
        <Route path="adicionar-deck" element={<AddDeck />} />
        <Route path="atualizar-deck" element={<UpdateDeck />} />
      </Routes>
    </>
  );
};
