import React from "react";
import { Button } from "../../components/Button/Index";
import { Input } from "../../components/Form/Input/Index";
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/Form/FormContainer/Index";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <section className="flex flex-col justify-center items-center w-screen h-screen fade-right">
      <FormContainer title="logar">
        <Input
          value={email}
          placeholder="email@example.com"
          onChange={({ target }) => setEmail(target.value)}
          label="email"
        />
        <Input
          value={password}
          placeholder="••••••••"
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          label="senha"
        />
        <Button>Entrar</Button>
        <p className="mt-4 mx-auto">
          Não possui uma conta?{" "}
          <Link to="/criar-conta" className="font-semibold">
            Criar conta
          </Link>{" "}
        </p>
      </FormContainer>
    </section>
  );
};
