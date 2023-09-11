import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Index";
import { Home } from "./pages/Home/Index";
import { Stats } from "./pages/Stats/Index";
import { Login } from "./pages/Login/Index";
import { Register } from "./pages/Register/Index";

function App() {
  return (
    <section className="grid grid-cols-[250px_auto]">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estatisticas" element={<Stats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-conta" element={<Register />} />
      </Routes>
    </section>
  );
}

export default App;
