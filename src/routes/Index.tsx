import { Loading } from "../components/Loading/Index";
import { useAuthContext } from "../contexts/AuthContext";
import { AppRoutes } from "./App.routes";
import { AuthRoutes } from "./Auth.routes";

export const Routes = () => {
  const { logged, user } = useAuthContext();

  if (logged === null) return <Loading />;
  return logged ? <AppRoutes user={user} /> : <AuthRoutes />;
};
