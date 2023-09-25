import React from "react";
import { User } from "../@types/global";
import { USER_LOGIN, USER_REGISTER, VALIDATE_TOKEN } from "../services/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  logged: boolean | null;
  setLogged: React.Dispatch<React.SetStateAction<boolean | null>>;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthConext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = React.useContext(AuthConext);
  if (!context) throw new Error("useContext deve estar dentro do Provider");
  return context;
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [logged, setLogged] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const token = "tokenUser";
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    const response = await USER_LOGIN(email, password);
    if (response.status === "error") {
      setError(response.message);
      setLogged(false);
      setUser(null);
    } else if (typeof response === "string") {
      setError(response);
      setLogged(false);
      setUser(null);
    } else if (response.data.user && response.data.token) {
      setUser(response.data.user);
      setLogged(true);
      setError(null);
      localStorage.setItem(token, response.data.token);
    }
  }

  async function registerUser(name: string, email: string, password: string) {
    const response = await USER_REGISTER(name, email, password);
    if (response.status === "error") {
      setError(response.message);
      setLogged(false);
      setUser(null);
    } else if (typeof response === "string") {
      setError(response);
      setLogged(false);
      setUser(null);
    } else if (response.status === 201) {
      await login(email, password);
      navigate("/");
    }
  }

  function logout() {
    setLogged(false);
    setUser(null);
    localStorage.removeItem(token);
  }

  React.useEffect(() => {
    async function autoLogin() {
      const storedToken = localStorage.getItem(token);
      if (storedToken) {
        const response = await VALIDATE_TOKEN(storedToken);
        if (response.status === "error") {
          setError("Faça login novamente!");
          setLogged(false);
          setUser(null);
        } else if (typeof response === "string") {
          setError(response);
          setLogged(false);
          setUser(null);
        } else if (response.status === 200) {
          setUser(response.data);
          setLogged(true);
          setError(null);
        }
      } else {
        setLogged(false);
        setUser(null);
      }
    }
    autoLogin();
    const timeOut = setTimeout(() => {
      setError(null);
    }, 5000);

    return () => clearTimeout(timeOut);
  }, []);

  return (
    <AuthConext.Provider
      value={{ user, login, logout, registerUser, logged, setLogged, error }}
    >
      {children}
    </AuthConext.Provider>
  );
};
