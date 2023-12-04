import { Button } from "../../components/Button/Index";
import { Input } from "../../components/Form/Input/Index";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../contexts/AuthContext";
import { AlertComponent } from "../../components/Error/Index";
import { Head } from "../../utils/Head";

const FormUserLoginSchema = z.object({
  email: z
    .string()
    .nonempty("O campo precisa ser preenchido!")
    .email("O formato do e-mail está incorreto!"),
  password: z
    .string()
    .min(5, "o campo precisa ter no mínimo 5 caracteres!")
    .nonempty("O campo precisa ser preenchido!"),
});

type FormUserLoginData = z.infer<typeof FormUserLoginSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserLoginData>({
    resolver: zodResolver(FormUserLoginSchema),
  });
  const { login, error, logged } = useAuthContext();

  function onFormSubmit(data: FormUserLoginData) {
    const { email, password } = data;
    login(email, password);
  }

  if (logged) return <Navigate to="/" />;
  return (
    <section className="flex flex-col justify-center items-center max-w-screen md:w-screen h-screen mt-[-64px] md:mt-0">
      <Head
        title="Login"
        description="Faça login no sistema de repetição espaçada fastmemo"
      />
      <form
        className="p-6 border border-slate-400 flex flex-col rounded-lg w-[350px] max-[400px]:w-[320px] md:w-[400px] fade-right"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <h1 className="font-bold text-2xl mb-4 mx-auto capitalize">Login</h1>
        <Input
          autoComplete="on"
          placeholder="email@example.com"
          label="email"
          name="email"
          register={register}
          errors={errors.email?.message}
        />

        <Input
          autoComplete="off"
          placeholder="••••••••"
          type="password"
          label="senha"
          name="password"
          register={register}
          errors={errors.password?.message}
        />
        <Button>Entrar</Button>
        <p className="mt-4 mx-auto">
          Não possui uma conta?{" "}
          <Link to="/criar-conta" className="font-semibold underline">
            Criar conta
          </Link>{" "}
        </p>
      </form>
      {error && <AlertComponent status="error">{error}</AlertComponent>}
    </section>
  );
};
