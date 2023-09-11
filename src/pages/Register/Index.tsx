import React from "react";
import { FormContainer } from "../../components/Form/FormContainer/Index";
import { Input } from "../../components/Form/Input/Index";
import { Button } from "../../components/Button/Index";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center fade-right">
      <FormContainer title="criar conta">
        <Input label="nome" />
        <Input label="email" type="email" />
        <Input label="senha" type="password" />
        <Button>Criar conta</Button>
        <p className="mt-4 mx-auto">
          Já possui uma conta?{" "}
          <Link to="/login" className="font-semibold">
            Logar
          </Link>{" "}
        </p>
      </FormContainer>
    </section>
  );
};
